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

  window = new BrowserWindow({
    fullscreen: true
  });

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, '/../../dist/game/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  window.removeMenu();

  window.webContents.openDevTools();

  window.on('closed', () => {
    window = null;
  });
}
