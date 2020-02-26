import { Injectable } from '@angular/core';
import { IpcRenderer } from "electron";

@Injectable()
export class NativeService {

  private ipcRenderer: IpcRenderer;

  constructor() {
    this.ipcRenderer = (<any> window).require('electron').ipcRenderer;
  }

  public exit() {
    this.ipcRenderer.send('exit');
  }
}
