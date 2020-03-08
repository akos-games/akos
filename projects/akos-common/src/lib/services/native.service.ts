import { Injectable } from '@angular/core';
import { FileFilter } from 'electron';
import { NativeState } from '../states/native.state';

@Injectable()
export class NativeService {

  private fs = window.require('fs-extra');
  private remote = window.require('electron').remote;

  constructor(private nativeState: NativeState) {
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

  async showOpenDialog(create = false, filters?: FileFilter[], defaultPath?: string): Promise<string> {

    let options: any = {
      properties: ['openFile', 'createDirectory'],
      filters: filters
    };

    if (create) {
      options.properties.push('promptToCreate');
    }

    if (defaultPath) {
      options.defaultPath = defaultPath
    }

    let selection = await this.remote.dialog.showOpenDialog(this.remote.getCurrentWindow(), options);

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
