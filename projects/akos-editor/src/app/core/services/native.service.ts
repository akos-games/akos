import { Injectable } from '@angular/core';
import { FileFilter, ipcRenderer, remote } from 'electron';
import { StatefulService } from 'akos-common';
import { NativeContext } from '../types/native-context';
import * as fs from 'fs-extra';

@Injectable()
export class NativeService extends StatefulService<NativeContext> {

  private ipcRenderer: typeof ipcRenderer;
  private remote: typeof remote;
  private fs: typeof fs;

  constructor() {
    super();

    this.ipcRenderer = window.require('electron').ipcRenderer;
    this.remote = window.require('electron').remote;

    this.ipcRenderer.once('isDevModeOk', (event, devMode) => this.setState({
      devMode,
      engineDir: devMode ? `${this.remote.app.getAppPath()}/../../build/akos-engine` : `${this.remote.process.cwd()}/engine`
    }));
    this.ipcRenderer.send('isDevMode');
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

  setProjectFile(file: string) {
    const projectDir = file.substring(0, file.lastIndexOf('/'));
    this.setState({
      ...this.getState(),
      projectFile: file,
      projectDir: projectDir,
      assetsDir: `${projectDir}/assets`,
      distDir: `${projectDir}/dist`
    });
  }

  setWindowTitle(title: string) {
    this.ipcRenderer.send('setWindowTitle', title);
  }

  getProjectDir(): string {
    return this.getState().projectDir;
  }

  getAssetsDir(): string {
    return this.getState().assetsDir;
  }

  getDistDir(): string {
    return this.getState().distDir;
  }

  getEngineDir(): string {
    return this.getState().engineDir;
  }
}
