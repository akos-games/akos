import {app, BrowserWindow} from 'electron';
import * as url from 'url';
import {FileService} from './services/file.service';

let mainWindow: BrowserWindow;
let fileService: FileService;

// Args default values
let args = {
  // Enable hot reload and development features
  serve: false
};

readArgs();

app.on('ready', createMainWindow);

// Required for MacOS
app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

function readArgs(): void {

  process.argv.slice(1).forEach(arg => {

    if (arg === '--serve' || arg === '-s') {
      args.serve = true;
    }
  });
}

function createMainWindow(): void {

  let loadUrl: any;

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
      // Allows Node API from render process
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

    // Required for MacOS
    mainWindow.on('closed', () => mainWindow = null);

    // Listen render process events
    initServices();

  })();
}

function initServices():void {
  fileService = new FileService(mainWindow);
}
