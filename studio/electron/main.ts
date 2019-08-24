import {app, BrowserWindow} from 'electron';
import * as url from 'url';
import {FileService} from './file.service';

let window: BrowserWindow;
let fileService: FileService = new FileService();
let args = {
  serve: false
};

readArgs();

app.on('ready', createWindow);
app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});

function readArgs() {

  process.argv.slice(1).forEach(arg => {
    if (arg === '--serve' || arg === '-s') {
      args.serve = true;
    }
  });
}

function createWindow() {

  let loadUrl: any;

  if (args.serve) {

    loadUrl = 'http://localhost:4200';
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../../../node_modules/electron`)
    });

  } else {

    loadUrl = url.format({
      pathname: `${__dirname}/../index.html`,
      protocol: 'file:',
      slashes: true,
    });
  }

  window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadURL(loadUrl).then(() => {

    window.setMenuBarVisibility(false);
    window.maximize();

    if (args.serve) {
      window.webContents.openDevTools();
    }

    window.on('closed', () => {
      window = null;
    });

    fileService.listen(window);
  });
}
