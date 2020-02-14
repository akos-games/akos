import { app, ipcMain, dialog, BrowserWindow, FileFilter } from 'electron';
import { existsSync, readFileSync, writeFileSync, ensureDirSync, copySync, removeSync, readdirSync } from 'fs-extra';
import * as process from 'process';

export function listenProcess(window: BrowserWindow, args: any) {

  ipcMain.on('exit', () => {
    window.close();
  });

  ipcMain.on('readFile', (event, file) => {
    window.webContents.send('fileRead', readFileSync(file));
  });

  ipcMain.on('writeFile', (event, file, data) => {
    writeFileSync(file, data);
    window.webContents.send('fileWritten');
  });

  ipcMain.on('selectNewFile', async (event, filters, defaultPath) => {
    let path = await selectFile(window, true, filters, defaultPath);
    window.webContents.send('newFileSelected', path);
  });

  ipcMain.on('selectExistingFile', async (event, filters, defaultPath) => {
    let path = await selectFile(window, false, filters, defaultPath);
    window.webContents.send('existingFileSelected', path);
  });

  ipcMain.on('checkProjectDirectory', (event, projectFile) => {

    let projectDir = getDirectory(projectFile);
    let projectFilename = getFilename(projectFile);
    let projectFileCount = readdirSync(projectDir).filter(file => file.endsWith('.akp') && file !== projectFilename).length;

    window.webContents.send('projectDirectoryChecked', projectFileCount === 0);
  });

  ipcMain.on('buildGame', (event, projectPath, gameDescriptor) => {

    // Prevent error when copying asar file
    require('process').noAsar = true;

    let enginePath = args.serve ? `${app.getAppPath()}/../../build/akos-engine` : `${process.cwd()}/engine`;
    let distPath = `${projectPath}/dist`;
    let assetsPath = `${projectPath}/assets`;

    removeSync(distPath);
    ensureDirSync(distPath);
    copySync(enginePath, distPath);

    if (existsSync(`${distPath}/win`)) {
      writeFileSync(`${distPath}/win/game-descriptor.akg`, JSON.stringify(gameDescriptor));
      copySync(assetsPath, `${distPath}/win/assets`);
    }

    if (existsSync(`${distPath}/mac`)) {
      writeFileSync(`${distPath}/mac/game-descriptor.akg`, JSON.stringify(gameDescriptor));
      copySync(assetsPath, `${distPath}/mac/assets`);
    }

    if (existsSync(`${distPath}/linux`)) {
      writeFileSync(`${distPath}/linux/game-descriptor.akg`, JSON.stringify(gameDescriptor));
      copySync(assetsPath, `${distPath}/linux/assets`);
    }

    window.webContents.send('gameBuilt');
  });
}

async function selectFile(window: BrowserWindow, allowCreate: boolean, filters?: FileFilter[], defaultPath?: string): Promise<string> {

  let options: any = {
    properties: ['openFile', 'createDirectory'],
    filters: filters
  };

  if (allowCreate) {
    options.properties.push('promptToCreate');
  }

  if (defaultPath) {
    options.defaultPath = defaultPath
  }

  let selection = await dialog.showOpenDialog(window, options);

  // Return null if user has cancelled selection
  let path = null;

  if (selection.filePaths.length !== 0) {
    // Get path and replace Windows backslash separator
    path = selection.filePaths[0].replace(/\\/g, '/');
  }

  return path;
}

function getDirectory(file: string): string {
  return file.substring(0, file.lastIndexOf('/'));
}

function getFilename(file: string): string {
  return file.substring(file.lastIndexOf('/') + 1);
}
