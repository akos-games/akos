import { app, ipcMain, dialog, BrowserWindow, FileFilter } from 'electron';
import { existsSync, readFileSync, writeFileSync, ensureDirSync, copySync, removeSync } from 'fs-extra';
import * as process from 'process';

export function listenProcess(window: BrowserWindow, args: any) {

  ipcMain.on('readFile', (event, file) => {
    window.webContents.send('fileRead', readFileSync(file));
  });

  ipcMain.on('writeFile', (event, file, data) => {
    writeFileSync(file, data);
    window.webContents.send('fileWritten');
  });

  ipcMain.on('selectNewFile', async (event, filters) => {
    let path = await selectFile(window, true, filters);
    window.webContents.send('newFileSelected', path);
  });

  ipcMain.on('selectExistingFile', async (event, filters) => {
    let path = await selectFile(window, false, filters);
    window.webContents.send('existingFileSelected', path);
  });

  ipcMain.on('buildGame', (event, projectPath, gameDescriptor) => {

    // Prevent error when copying asar file
    require('process').noAsar = true;

    let enginePath = args.serve ? `${app.getAppPath()}/../release/akos-editor/engine` : `${process.execPath}/engine`;
    let distPath = `${projectPath}/dist`;

    removeSync(distPath);
    ensureDirSync(distPath);
    copySync(enginePath, distPath);

    if (existsSync(`${distPath}/win`)) {
      writeFileSync(`${distPath}/win/game-descriptor.akg`, JSON.stringify(gameDescriptor));
    }

    if (existsSync(`${distPath}/mac`)) {
      writeFileSync(`${distPath}/mac/game-descriptor.akg`, JSON.stringify(gameDescriptor));
    }

    if (existsSync(`${distPath}/linux`)) {
      writeFileSync(`${distPath}/linux/game-descriptor.akg`, JSON.stringify(gameDescriptor));
    }

    window.webContents.send('gameBuilt');
  });
}

async function selectFile(window: BrowserWindow, allowCreate: boolean, filters?: FileFilter[]): Promise<string> {

  let properties: any[] = ['openFile', 'createDirectory'];
  if (allowCreate) {
    properties.push('promptToCreate');
  }

  let selection = await dialog.showOpenDialog(window, {
    properties: properties,
    filters: filters
  });

  // Return null if user has cancelled selection
  let path = null;

  if (selection.filePaths.length !== 0) {
    // Get path and replace Windows backslash separator
    path = selection.filePaths[0].replace(/\\/g, '/');
  }

  return path;
}
