import {Injectable} from '@angular/core';
import {IpcRenderer, FileFilter} from 'electron';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private ipc: IpcRenderer;

  constructor() {
    this.ipc = (<any> window).require('electron').ipcRenderer;
  }

  public async writeFile(file: string, data: any): Promise<void> {

    return new Promise<void>(resolve => {
      this.ipc.once('fileWritten', () => resolve());
      this.ipc.send('writeFile', file, data);
    });
  }

  public async selectFile(filters?: FileFilter[]): Promise<string> {

    return new Promise<string>(resolve => {
      this.ipc.once('fileSelected', (event, path) => resolve(path));
      this.ipc.send('selectFile', filters);
    });
  }
}
