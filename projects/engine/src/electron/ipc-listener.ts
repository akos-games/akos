import { ipcMain, BrowserWindow } from 'electron';
import { readFileSync, writeFileSync } from 'fs';

export function listenProcess(window: BrowserWindow, args: any) {

  ipcMain.once('loadGameDescriptor', () => {

    let path = args.serve ? `${__dirname}/../game/dist/win/game-descriptor.akg` : 'game-descriptor.akg';
    let gameDescriptor = JSON.parse(readFileSync(path).toString());

    window.setTitle(gameDescriptor.name);
    window.webContents.send('gameDescriptorLoaded', gameDescriptor);
  });

  ipcMain.on('readFile', (event, file) => {
    window.webContents.send('fileRead', readFileSync(file));
  });

  ipcMain.on('writeFile', (event, file, data) => {
    writeFileSync(file, data);
    window.webContents.send('fileWritten');
  });
}
