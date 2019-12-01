import { Injectable } from '@angular/core';
import { GameDescriptorStore } from '../stores/game-descriptor.store';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class GameDescriptorService {

  private ipcRenderer: IpcRenderer;

  constructor(private gameDescriptorStore: GameDescriptorStore) {
    this.ipcRenderer = (<any> window).require('electron').ipcRenderer;
  }

  loadGameDescriptor() {
    this.ipcRenderer.once('gameDescriptorLoaded', (event, gameDescriptor) => this.gameDescriptorStore.updateState(gameDescriptor));
    this.ipcRenderer.send('loadGameDescriptor');
  }
}
