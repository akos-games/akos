import { app, BrowserWindow } from 'electron';
import * as url from 'url';
import { FileListener } from './listeners/file.listener';

let mainWindow: BrowserWindow;
let fileListener: FileListener;

// Default args values
let args = {
  // Enable hot reload and development features
  serve: false
};

app.on('ready', createMainWindow);

// MacOS
app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

readArgs();

function readArgs() {

  process.argv.slice(1).forEach(arg => {
    switch (arg) {
      case '--serve':
      case '-s':
        args.serve = true;
        break;
    }
  });
}

function createMainWindow() {

  let loadUrl;

  if (args.serve) {

    loadUrl = 'http://localhost:4200';
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../../node_modules/electron`)
    });

  } else {

    loadUrl = url.format({
      pathname: `${__dirname}/index.html`,
      protocol: 'file:',
      slashes: true,
    });
  }

  mainWindow = new BrowserWindow({
    webPreferences: {
      // Allows NodeJS API from render process
      nodeIntegration: true
    }
  });

  (async () => {

    await mainWindow.loadURL(loadUrl);

    mainWindow.setMenuBarVisibility(false);
    mainWindow.maximize();

    if (args.serve) {
      mainWindow.webContents.openDevTools();
    }

    // MacOS
    mainWindow.on('closed', () => mainWindow = null);

    // Listen render process events
    initListeners();

  })();
}

function initListeners() {
  fileListener = new FileListener(mainWindow);
}