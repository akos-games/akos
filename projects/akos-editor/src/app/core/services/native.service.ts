import { Injectable } from '@angular/core';
import { FileFilter, IpcRenderer } from 'electron';

@Injectable()
export class NativeService {

  private ipcRenderer: IpcRenderer;

  constructor() {
    this.ipcRenderer = (<any> window).require('electron').ipcRenderer;
  }

  public exit() {
    this.ipcRenderer.send('exit');
  }

  public async readFile(file: string): Promise<any> {

    return new Promise<any>(resolve => {
      this.ipcRenderer.once('fileRead', (event, data) => resolve(data));
      this.ipcRenderer.send('readFile', file);
    });
  }

  public async writeFile(file: string, data: any): Promise<void> {

    return new Promise<void>(resolve => {
      this.ipcRenderer.once('fileWritten', () => resolve());
      this.ipcRenderer.send('writeFile', file, data);
    });
  }

  public async selectNewFile(filters?: FileFilter[], defaultPath?: string): Promise<string> {

    return new Promise<string>(resolve => {
      this.ipcRenderer.once('newFileSelected', (event, path) => resolve(path));
      this.ipcRenderer.send('selectNewFile', filters, defaultPath);
    });
  }

  public async selectExistingFile(filters?: FileFilter[], defaultPath?: string): Promise<string> {

    return new Promise<string>(resolve => {
      this.ipcRenderer.once('existingFileSelected', (event, path) => resolve(path));
      this.ipcRenderer.send('selectExistingFile', filters, defaultPath);
    });
  }

  public async checkProjectDirectory(projectFile: string): Promise<boolean> {

    return new Promise<boolean>(resolve => {
      this.ipcRenderer.once('projectDirectoryChecked', (event, isValid) => resolve(isValid));
      this.ipcRenderer.send('checkProjectDirectory', projectFile);
    });
  }

  public async buildGame(projectPath: string, gameDescriptor: any): Promise<void> {

    return new Promise<void>(resolve => {
      this.ipcRenderer.once('gameBuilt', () => resolve());
      this.ipcRenderer.send('buildGame', projectPath, gameDescriptor);
    });
  }
}
