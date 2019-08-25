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

  public async readFile(file: string): Promise<any> {

    return new Promise<any>(resolve => {
      this.ipc.once('fileRead', (event, data) => resolve(data));
      this.ipc.send('readFile', file);
    });
  }

  public async writeFile(file: string, data: any): Promise<void> {

    return new Promise<void>(resolve => {
      this.ipc.once('fileWritten', () => resolve());
      this.ipc.send('writeFile', file, data);
    });
  }

  public async selectNewFile(filters?: FileFilter[]): Promise<string> {

    return new Promise<string>(resolve => {
      this.ipc.once('newFileSelected', (event, path) => resolve(path));
      this.ipc.send('selectNewFile', filters);
    });
  }

  public async selectExistingFile(filters?: FileFilter[]): Promise<string> {

    return new Promise<string>(resolve => {
      this.ipc.once('existingFileSelected', (event, path) => resolve(path));
      this.ipc.send('selectExistingFile', filters);
    });
  }
}
