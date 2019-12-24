import { Injectable } from '@angular/core';
import { IpcRenderer } from "electron";
import { StatefulService } from 'akos-common/utils/service/stateful.service';

export interface NativeState {
  workingDirectory: string;
}

@Injectable({
  providedIn: 'root'
})
export class NativeService extends StatefulService<NativeState> {

  private ipcRenderer: IpcRenderer;

  constructor() {
    super();
    this.ipcRenderer = (<any> window).require('electron').ipcRenderer;
    this.fetchWorkingDirectory();
  }

  async readFile(file: string) {
    return new Promise<any>(resolve => {
      this.ipcRenderer.once('fileRead', (event, data) => resolve(data));
      this.ipcRenderer.send('readFile', file);
    });
  }

  setWindowTitle(title: string) {
    this.ipcRenderer.send('setWindowTitle', title);
  }

  getWorkingDirectory(): string {
    return this.getState().workingDirectory;
  }

  private fetchWorkingDirectory() {
    this.ipcRenderer.once('workingDirectory', (event, workingDirectory) => this.setState({workingDirectory}));
    this.ipcRenderer.send('getWorkingDirectory')
  }
}
