import { Injectable } from '@angular/core';
import { IpcRenderer, FileFilter } from 'electron';

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

  public async selectNewFile(filters?: FileFilter[], defaultPath?: string): Promise<string> {

    return new Promise<string>(resolve => {
      this.ipc.once('newFileSelected', (event, path) => resolve(path));
      this.ipc.send('selectNewFile', filters, defaultPath);
    });
  }

  public async selectExistingFile(filters?: FileFilter[], defaultPath?: string): Promise<string> {

    return new Promise<string>(resolve => {
      this.ipc.once('existingFileSelected', (event, path) => resolve(path));
      this.ipc.send('selectExistingFile', filters, defaultPath);
    });
  }

  public async checkProjectDirectory(projectFile: string): Promise<boolean> {

    return new Promise<boolean>(resolve => {
      this.ipc.once('projectDirectoryChecked', (event, isValid) => resolve(isValid));
      this.ipc.send('checkProjectDirectory', projectFile);
    });
  }

  public async buildGame(projectPath: string, gameDescriptor: any): Promise<void> {

    return new Promise<void>(resolve => {
      this.ipc.once('gameBuilt', () => resolve());
      this.ipc.send('buildGame', projectPath, gameDescriptor);
    });
  }
}