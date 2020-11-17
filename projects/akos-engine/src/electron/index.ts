import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import { format } from 'url';
import * as fs from 'fs-extra';

declare const global: any;

// Needed to include fs-extra in Electron build
// noinspection BadExpressionStatementJS
fs;

let mainWindow: BrowserWindow;

// Default args values
let args = {
  // Enable hot reload and engine development features
  serve: false
};

readArgs();
setExecutionContext();

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

function setExecutionContext() {

  global.executionContext = {
    args: args,
    workingDir: args.serve ? `${__dirname}/../../game/dist/TestGame-1.0-win` : process.cwd(),
    serveDistDir: args.serve ? `${__dirname}/../..` : null
  }
}

function createMainWindow() {

  let loadUrl;

  if (args.serve) {

    loadUrl = 'http://localhost:4201';
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
      // Allows render process to access local files
      webSecurity: false,
      // Allows NodeJS API from render process
      nodeIntegration: true,
      // Allows Remote API from render process
      enableRemoteModule: true
    }
  });

  (async () => {

    await mainWindow.loadURL(loadUrl);

    mainWindow.setMenuBarVisibility(false);
    mainWindow.maximize();

    if (args.serve) {
      mainWindow.webContents.openDevTools();
    }

    mainWindow.on('close', event => {
      ipcMain.emit('close');
      event.preventDefault();
    });

  })();

  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = decodeURI(request.url.replace('file:///', ''));
    callback(pathname);
  });
}
