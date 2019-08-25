import {ipcMain, dialog, BrowserWindow, FileFilter} from 'electron';

export class FileService {

  constructor(private mainWindow: BrowserWindow) {
    ipcMain.on('readFile', (event, file) => this.readFile(file));
    ipcMain.on('writeFile', (event, file, data) => this.writeFile(file, data));
    ipcMain.on('selectNewFile', async (event, filters) => this.selectNewFile(filters));
    ipcMain.on('selectExistingFile', async (event, filters) => this.selectExistingFile(filters));
  }

  private readFile(file: string): any {

    require('fs').readFile(file, null, (err, data) => {
      this.mainWindow.webContents.send('fileRead', data);
    });
  }

  private writeFile(file: string, data: any): void {

    require('fs').writeFile(file, data, null, () => {
      this.mainWindow.webContents.send('fileWritten');
    });
  }

  private async selectNewFile(filters?: FileFilter[]): Promise<void> {
    let path = await this.selectFile(true, filters);
    this.mainWindow.webContents.send('newFileSelected', path);
  }

  private async selectExistingFile(filters?: FileFilter[]): Promise<void> {
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
      // Get path and replace backslash Windows separator
      path = selection.filePaths[0].replace(/\\/g, '/');
    }

    return path;
  }
}
