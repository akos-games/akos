import {ipcMain, dialog, BrowserWindow, remote} from 'electron';

export class FileService {

  private window: BrowserWindow;

  public listen(window: BrowserWindow): void {

    this.window = window;

    ipcMain.on('writeFile', (event, filename, folderPath, data) => this.writeFile(filename, folderPath, data));
    ipcMain.on('selectFolder', () => this.selectFolder());
  }

  private writeFile(filename: string, folderPath: string, data: any): void {

    require('fs').writeFile(`${folderPath}/${filename}`, data, null, (err) => {

      if (err) {
        throw err;
      }

      this.window.webContents.send('writeFileResponse');
    });
  }

  private selectFolder(): void {

    dialog.showOpenDialog(this.window, {properties: ['openDirectory']}).then(selection => {
      let path = selection.filePaths.length === 0 ? null : selection.filePaths[0];
      this.window.webContents.send('selectFolderResponse', path);
    });
  }
}
