import { Injectable } from '@angular/core';
import { FileFilter } from 'electron';
import { NativeState } from '../states/native.state';

@Injectable()
export class NativeService {

  private fs = window.require('fs-extra');
  private remote = window.require('electron').remote;
  private process = window.require('process');

  constructor(private nativeState: NativeState) {

    // Prevent error when copying asar file
    this.process.noAsar = true;

    this.nativeState.set(this.remote.getGlobal('executionContext'));
  }

  exit() {
    this.remote.getCurrentWindow().close();
  }

  readFile(file: string): any {
    return this.fs.readFileSync(file);
  }

  writeFile(file: string, data) {
    this.fs.writeFileSync(file, data);
  }

  readDir(dir: string): string[] {
    return this.fs.readdirSync(dir);
  }

  ensureDir(dir: string) {
    this.fs.ensureDirSync(dir);
  }

  exists(fileOrDir: string): boolean {
    return this.fs.existsSync(fileOrDir);
  }

  copy(source: string, destination: string) {
    this.fs.copySync(source, destination)
  }

  remove(fileOrDir: string) {
    this.fs.removeSync(fileOrDir);
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

  setWindowTitle(title: string) {
    this.remote.getCurrentWindow().setTitle(title);
  }
}
