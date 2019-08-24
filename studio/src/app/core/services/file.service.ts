import {Injectable} from '@angular/core';
import {IpcRenderer} from 'electron';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private ipc: IpcRenderer;

  constructor() {
    this.ipc = (<any> window).require('electron').ipcRenderer;
  }

  public async selectFolder(): Promise<string> {

    return new Promise<string>(resolve => {
      this.ipc.once('selectFolderResponse', (event, path) => {debugger;resolve(path)});
      this.ipc.send('selectFolder');
    });
  }

  public async writeFile(filename: string, folder: string, data: any): Promise<void> {

    return new Promise<void>(resolve => {
      this.ipc.once('writeFileResponse', () => resolve());
      this.ipc.send('writeFile', filename, folder, data);
    });
  }
}
