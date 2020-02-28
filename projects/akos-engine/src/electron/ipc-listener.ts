import { ipcMain, BrowserWindow } from 'electron';
import { readFileSync, writeFileSync } from 'fs';

export function listenProcess(window: BrowserWindow, args: any) {

  ipcMain.on('exit', () => {
    window.close();
  });

  ipcMain.on('readFile', (event, file) => {
    window.webContents.send('readFileOk', readFileSync(file));
  });

  ipcMain.on('writeFile', (event, file, data) => {
    writeFileSync(file, data);
    window.webContents.send('writeFileOk');
  });

  ipcMain.on('setWindowTitle', (event, title) => {
    window.setTitle(title);
  });

  ipcMain.on('getWorkingDirectory', () => {
    window.webContents.send('getWorkingDirectoryOk', args.serve ? `${__dirname}/../../game/dist/win` : process.cwd());
  });
}
