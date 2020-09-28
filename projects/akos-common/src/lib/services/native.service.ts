import { Injectable } from '@angular/core';
import { FileFilter } from 'electron';
import { NativeState } from '../states/native.state';
import sanitize from 'sanitize-filename';

@Injectable()
export class NativeService {

  private remote = window.require('electron').remote;
  private fs = this.remote.require('fs-extra');

  constructor(private nativeState: NativeState) {
    this.nativeState.set(this.remote.getGlobal('executionContext'));
  }

  exit() {
    this.remote.getCurrentWindow().close();
  }

  async readFile(file: string): Promise<any> {
    return new Promise<any>((resolve, reject) => this.fs.readFile(file, (error, data) => {
      error && reject(error);
      resolve(data);
    }));
  }

  async writeFile(file: string, data) {
    return new Promise<void>((resolve, reject) => this.fs.writeFile(file, data, error => {
      error && reject(error);
      resolve();
    }));
  }

  async readDir(dir: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => this.fs.readdir(dir, (error, files) => {
      error && reject(error);
      resolve(files);
    }));
  }

  async ensureDir(dir: string) {
    return new Promise<void>((resolve, reject) => this.fs.ensureDir(dir, error => {
      error && reject(error);
      resolve();
    }));
  }

  async exists(fileOrDir: string): Promise<boolean> {
    return new Promise<boolean>(resolve => this.fs.access(fileOrDir, error => resolve(!error)));
  }

  async copy(source: string, destination: string) {
    return new Promise<void>((resolve, reject) => this.fs.copy(source, destination, error => {
      error && reject(error);
      resolve();
    }));
  }

  async move(source: string, destination: string) {
    return new Promise<void>((resolve, reject) => this.fs.move(source, destination, error => {
      error && reject(error);
      resolve();
    }));
  }

  async remove(fileOrDir: string) {
    return new Promise<void>((resolve, reject) => this.fs.remove(fileOrDir, error => {
      error && reject(error);
      resolve();
    }));
  }

  async desktopOpen(fileOrDir: string): Promise<string> {
    return this.remote.shell.openPath(fileOrDir);
  }

  async showOpenDialog(filters?: FileFilter[], options?: {create?: boolean, defaultPath?: string, directory?: boolean}): Promise<string> {

    let dialogOptions: any = {
      properties: [options?.directory ? 'openDirectory' : 'openFile', 'createDirectory'],
      filters: filters
    };

    if (options?.create) {
      dialogOptions.properties.push('promptToCreate');
    }

    if (options?.defaultPath) {
      dialogOptions.defaultPath = options.defaultPath;
    }

    let selection = await this.remote.dialog.showOpenDialog(this.remote.getCurrentWindow(), dialogOptions);

    // Return null if user has cancelled selection
    let path = null;

    if (selection.filePaths.length !== 0) {
      // Get path and replace Windows backslash separator
      path = selection.filePaths[0].replace(/\\/g, '/');
    }

    return path;
  }

  setAppName(name: string) {
    this.setWindowTitle(name);
    this.nativeState.set({
      ...this.nativeState.get(),
      appDataDir: `${this.remote.app.getPath('appData')}/${sanitize(name)}`
    });
  }

  setFullscreen(fullscreen: boolean) {
    this.remote.getCurrentWindow().setFullScreen(fullscreen);
  }

  setWindowTitle(title: string) {
    this.remote.getCurrentWindow().setTitle(title);
  }

  getAppDataDir() {
    return this.remote.app.getPath('appData');
  }

  getTempDir() {
    return this.remote.app.getPath('temp');
  }
}
