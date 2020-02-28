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

  async selectNewFile(filters?: FileFilter[], defaultPath?: string): Promise<string> {
    return new Promise<string>(resolve => {
      this.ipcRenderer.once('selectNewFileOk', (event, path) => resolve(path));
      this.ipcRenderer.send('selectNewFile', filters, defaultPath);
    });
  }

  async selectExistingFile(filters?: FileFilter[], defaultPath?: string): Promise<string> {
    return new Promise<string>(resolve => {
      this.ipcRenderer.once('selectExistingFileOk', (event, path) => resolve(path));
      this.ipcRenderer.send('selectExistingFile', filters, defaultPath);
    });
  }

  async readDir(dir: string): Promise<string[]> {
    return new Promise<string[]>(resolve => {
      this.ipcRenderer.once('readDirOk', (event, files) => resolve(files));
      this.ipcRenderer.send('readDir', dir);
    });
  }

  async ensureDir(dir: string): Promise<void> {
    return new Promise<void>(resolve => {
      this.ipcRenderer.once('ensureDirOk', () => resolve());
      this.ipcRenderer.send('ensureDir', dir);
    });
  }

  async exists(fileOrDir: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.ipcRenderer.once('existsOk', (event, exists) => resolve(exists));
      this.ipcRenderer.send('exists', fileOrDir);
    });
  }

  async copy(source: string, destination: string): Promise<void> {
    return new Promise<void>(resolve => {
      this.ipcRenderer.once('copyOk', () => resolve());
      this.ipcRenderer.send('copy', source, destination);
    });
  }

  async remove(fileOrDir: string): Promise<void> {
    return new Promise<void>(resolve => {
      this.ipcRenderer.once('removeOk', () => resolve());
      this.ipcRenderer.send('remove', fileOrDir);
    });
  }

  // Can't be computed from working directory since it depends on environment (dev or prod)
  async getEngineDir(): Promise<string> {
    return new Promise<string>(resolve => {
      this.ipcRenderer.once('getEngineDirOk', (event, engineDir) => resolve(engineDir));
      this.ipcRenderer.send('getEngineDir');
    });
  }

  setProjectFile(file: string) {
    const projectDir = file.substring(0, file.lastIndexOf('/'));
    this.setState({
      projectFile: file,
      projectDir: projectDir,
      assetsDir: `${projectDir}/assets`
    });
  }

  setWindowTitle(title: string) {
    this.ipcRenderer.send('setWindowTitle', title);
  }
}
