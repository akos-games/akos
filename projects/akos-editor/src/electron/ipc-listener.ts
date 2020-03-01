import { ipcMain, dialog, BrowserWindow, FileFilter } from 'electron';
import { existsSync, readFileSync, writeFileSync, ensureDirSync, copySync, removeSync, readdirSync } from 'fs-extra';

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

  ipcMain.on('selectNewFile', async (event, filters, defaultPath) => {
    let path = await selectFile(window, true, filters, defaultPath);
    window.webContents.send('selectNewFileOk', path);
  });

  ipcMain.on('selectExistingFile', async (event, filters, defaultPath) => {
    let path = await selectFile(window, false, filters, defaultPath);
    window.webContents.send('selectExistingFileOk', path);
  });

  ipcMain.on('readDir', (event, dir) => {
    window.webContents.send('readDirOk', readdirSync(dir));
  });

  ipcMain.on('ensureDir', (event, dir) => {
    window.webContents.send('ensureDirOk', ensureDirSync(dir));
  });

  ipcMain.on('exists', (event, fileOrDir) => {
    window.webContents.send('existsOk', existsSync(fileOrDir));
  });

  ipcMain.on('copy', (event, source, destination) => {
    window.webContents.send('copyOk', copySync(source, destination));
  });

  ipcMain.on('remove', (event, fileOrDir) => {
    window.webContents.send('removeOk', removeSync(fileOrDir));
  });

  ipcMain.on('setWindowTitle', (event, title) => {
    window.setTitle(title);
    window.webContents.send('setWindowTitleOk');
  });

  ipcMain.on('isDevMode', () => {
    window.webContents.send('isDevModeOk', args.serve);
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
