import { app, ipcMain, dialog, BrowserWindow, FileFilter } from 'electron';

const fs = require('fs-extra');
const process = require('process');

export class FileListener {

  private enginePath: string;

  constructor(private mainWindow: BrowserWindow, private devMode: boolean) {

    this.enginePath = devMode ? `${app.getAppPath()}/../release/editor/win-unpacked/engine` : `${process.execPath}/engine`;

    ipcMain.on('readFile', (event, file) => this.readFile(file));
    ipcMain.on('writeFile', (event, file, data) => this.writeFile(file, data));
    ipcMain.on('selectNewFile', async (event, filters) => this.selectNewFile(filters));
    ipcMain.on('selectExistingFile', async (event, filters) => this.selectExistingFile(filters));
    ipcMain.on('buildGame', (event, projectPath, gameDescriptor) => this.buildGame(projectPath, gameDescriptor));
  }

  private readFile(file: string) {
    let data = fs.readFileSync(file);
    this.mainWindow.webContents.send('fileRead', data);
  }

  private writeFile(file: string, data: any) {
    fs.writeFileSync(file, data);
    this.mainWindow.webContents.send('fileWritten');
  }

  private async selectNewFile(filters?: FileFilter[]) {
    let path = await this.selectFile(true, filters);
    this.mainWindow.webContents.send('newFileSelected', path);
  }

  private async selectExistingFile(filters?: FileFilter[]) {
    let path = await this.selectFile(false, filters);
    this.mainWindow.webContents.send('existingFileSelected', path);
  }

  private async selectFile(allowCreate: boolean, filters?: FileFilter[]): Promise<string> {

    let properties: any[] = ['openFile', 'createDirectory'];
    if (allowCreate) {
      properties.push('promptToCreate');
    }

    let selection = await dialog.showOpenDialog(this.mainWindow, {
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

  private buildGame(projectPath: string, gameDesriptor: any) {

    let distPath = `${projectPath}/dist`;

    fs.ensureDirSync(distPath);
    fs.copySync(this.enginePath, distPath);

    if (fs.existsSync(`${distPath}/win`)) {
      fs.writeFileSync(`${distPath}/win/game-descriptor.akg`, JSON.stringify(gameDesriptor));
    }

    if (fs.existsSync(`${distPath}/mac`)) {
      fs.writeFileSync(`${distPath}/mac/game-descriptor.akg`, JSON.stringify(gameDesriptor));
    }

    if (fs.existsSync(`${distPath}/linux`)) {
      fs.writeFileSync(`${distPath}/linux/game-descriptor.akg`, JSON.stringify(gameDesriptor));
    }

    this.mainWindow.webContents.send('gameBuilt');
  }
}
