import { app, BrowserWindow } from 'electron';
import { listenProcess } from './ipc-listener';
import { format } from 'url';

let mainWindow: BrowserWindow;

// Default args values
let args = {
  // Enable hot reload and engine development features
  serve: false
};

readArgs();

app.on('ready', createMainWindow);
app.on('window-all-closed', () => app.quit());

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

    loadUrl = format({
      pathname: `${__dirname}/index.html`,
      protocol: 'file:',
      slashes: true,
    });
  }

  mainWindow = new BrowserWindow({
    webPreferences: {
      // Allows render process to access local files
      webSecurity: false,
      // Allows NodeJS API from render process
      nodeIntegration: true
    }
  });

  listenProcess(mainWindow, args);

  (async () => {

    await mainWindow.loadURL(loadUrl);

    mainWindow.setMenuBarVisibility(false);
    mainWindow.setFullScreen(true);

    if (args.serve) {
      mainWindow.webContents.openDevTools();
    }

  })();
}
