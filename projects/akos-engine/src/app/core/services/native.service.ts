import { Injectable } from '@angular/core';
import { IpcRenderer } from "electron";
import { StatefulService } from 'akos-common';
import { NativeContext } from '../types/native-context';

@Injectable()
export class NativeService extends StatefulService<NativeContext> {

  private ipcRenderer: IpcRenderer;

  constructor() {
    super();
    this.ipcRenderer = (<any> window).require('electron').ipcRenderer;
    this.initContext();
  }

  exit() {
    this.ipcRenderer.send('exit');
  }

  async readFile(file: string): Promise<any> {
    return new Promise<any>(resolve => {
      this.ipcRenderer.once('readFileOk', (event, data) => resolve(data));
      this.ipcRenderer.send('readFile', file);
    });
  }

  async writeFile(file: string, data: any): Promise<void> {
    return new Promise<void>(resolve => {
      this.ipcRenderer.once('writeFileOk', () => resolve());
      this.ipcRenderer.send('writeFile', file, data);
    });
  }

  setWindowTitle(title: string) {
    this.ipcRenderer.send('setWindowTitle', title);
  }

  getWorkingDir() {
    return this.getState().workingDirectory;
  }

  private async initContext() {
    this.setState({
      workingDirectory: await this.getWorkingDirectory()
    });
  }

  private getWorkingDirectory(): Promise<string> {
    return new Promise<string>(resolve => {
      this.ipcRenderer.once('getWorkingDirectoryOk', (event, workingDirectory) => resolve(workingDirectory));
      this.ipcRenderer.send('getWorkingDirectory');
    });
  }
}
