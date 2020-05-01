import { app, BrowserWindow } from 'electron';
import { format } from 'url';

declare const global: any;

// Prevent error when copying asar file
process.noAsar = true;

let mainWindow: BrowserWindow;

// Default args values
let args = {
  // Enable hot reload and development features
  serve: false
};

readArgs();
setExecutionContext();

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// MacOS
app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

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

function setExecutionContext() {

  global.executionContext = {
    args: args,
    workingDir: args.serve ? `${__dirname}` : process.cwd(),
    serveDistDir: args.serve ? `${__dirname}/../..` : null
  }
}

function createMainWindow() {

  let loadUrl;

  if (args.serve) {

    loadUrl = 'http://localhost:4200';
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../../../node_modules/electron`)
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

  })();
}
