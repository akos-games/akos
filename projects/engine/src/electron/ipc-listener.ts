import { ipcMain, BrowserWindow } from 'electron';
import { readFileSync, writeFileSync } from 'fs';

export function listenProcess(window: BrowserWindow, args: any) {

  ipcMain.on('readFile', (event, file) => {
    window.webContents.send('fileRead', readFileSync(file));
  });

  ipcMain.on('writeFile', (event, file, data) => {
    writeFileSync(file, data);
    window.webContents.send('fileWritten');
  });

  ipcMain.on('setWindowTitle', (event, title) => {
    window.setTitle(title);
    window.webContents.send('windowTitleSet');
  });

  ipcMain.on('getWorkingDirectory', () => {
    window.webContents.send('workingDirectory', args.serve ? `${__dirname}/../game/dist/win` : process.cwd());
  });
}
