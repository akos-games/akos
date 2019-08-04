import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let window: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {

  if (window === null) {
    createWindow();
  }
});

function createWindow() {

  window = new BrowserWindow();

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, '/../../dist/studio/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  window.setMenuBarVisibility(false);
  window.maximize();

  window.webContents.openDevTools();

  window.on('closed', () => {
    window = null;
  });
}
