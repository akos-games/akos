import {ipcMain, dialog, BrowserWindow, FileFilter} from 'electron';

export class FileService {

  constructor(private mainWindow: BrowserWindow) {
    ipcMain.on('writeFile', (event, file, data) => this.writeFile(file, data));
    ipcMain.on('selectFile', async (event, filters) => this.selectFile(filters));
  }

  private writeFile(file: string, data: any): void {

    require('fs').writeFile(file, data, null, () => {
      this.mainWindow.webContents.send('fileWritten');
    });
  }

  private async selectFile(filters?: FileFilter[]): Promise<void> {

    let selection = await dialog.showOpenDialog(this.mainWindow, {
      properties: ['openFile', 'createDirectory', 'promptToCreate'],
      filters: filters
    });

    // Return null if user has cancelled selection
    let path = null;

    if (selection.filePaths.length !== 0) {
      // Get path and replace backslash Windows separator
      path = selection.filePaths[0].replace(/\\/g, '/');
    }

    this.mainWindow.webContents.send('fileSelected', path);
  }
}
