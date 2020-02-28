import { Injectable } from '@angular/core';
import { FileFilter, IpcRenderer } from 'electron';
import { StatefulService } from 'akos-common';
import { NativeContext } from '../types/native-context';

@Injectable()
export class NativeService extends StatefulService<NativeContext> {

  private ipcRenderer: IpcRenderer;

  constructor() {
    super();
    this.ipcRenderer = (<any> window).require('electron').ipcRenderer;
  }

  setProjectFile(file: string) {
    const projectDir = file.substring(0, file.lastIndexOf('/'));
    this.setState({
      projectFile: file,
      projectDir: projectDir,
      assetsDir: `${projectDir}/assets`
    });
  }

  exit() {
    this.ipcRenderer.send('exit');
  }

  async readFile(file: string): Promise<any> {
    return new Promise<any>(resolve => {
      this.ipcRenderer.once('fileRead', (event, data) => resolve(data));
      this.ipcRenderer.send('readFile', file);
    });
  }

  async writeFile(file: string, data: any): Promise<void> {
    return new Promise<void>(resolve => {
      this.ipcRenderer.once('fileWritten', () => resolve());
      this.ipcRenderer.send('writeFile', file, data);
    });
  }

  async selectNewFile(filters?: FileFilter[], defaultPath?: string): Promise<string> {
    return new Promise<string>(resolve => {
      this.ipcRenderer.once('newFileSelected', (event, path) => resolve(path));
      this.ipcRenderer.send('selectNewFile', filters, defaultPath);
    });
  }

  async selectExistingFile(filters?: FileFilter[], defaultPath?: string): Promise<string> {
    return new Promise<string>(resolve => {
      this.ipcRenderer.once('existingFileSelected', (event, path) => resolve(path));
      this.ipcRenderer.send('selectExistingFile', filters, defaultPath);
    });
  }

  async checkProjectDirectory(projectFile: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.ipcRenderer.once('projectDirectoryChecked', (event, isValid) => resolve(isValid));
      this.ipcRenderer.send('checkProjectDirectory', projectFile);
    });
  }

  async buildGame(gameDescriptor: any): Promise<void> {
    return new Promise<void>(resolve => {
      this.ipcRenderer.once('gameBuilt', () => resolve());
      this.ipcRenderer.send('buildGame', this.getState().projectDir, gameDescriptor);
    });
  }
}
