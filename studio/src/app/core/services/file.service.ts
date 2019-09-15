import {Injectable} from '@angular/core';
import {IpcRenderer, FileFilter} from 'electron';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private ipc: IpcRenderer;

  constructor() {
    this.ipc = (<any> window).require('electron').ipcRenderer;
  }

  public readFile(file: string): Observable<any> {

    return new Observable<any>(subscriber => {
      this.ipc.once('fileRead', (event, data) => subscriber.next(data));
      this.ipc.send('readFile', file);
    });
  }

  public writeFile(file: string, data: any): Observable<void> {

    return new Observable<void>(subscriber => {
      this.ipc.once('fileWritten', () => subscriber.next());
      this.ipc.send('writeFile', file, data);
    });
  }

  public selectNewFile(filters?: FileFilter[]): Observable<string> {

    return new Observable<string>(subscriber => {
      this.ipc.once('newFileSelected', (event, path) => subscriber.next(path));
      this.ipc.send('selectNewFile', filters);
    });
  }

  public selectExistingFile(filters?: FileFilter[]): Observable<string> {

    return new Observable<string>(subscriber => {
      this.ipc.once('existingFileSelected', (event, path) => subscriber.next(path));
      this.ipc.send('selectExistingFile', filters);
    });
  }
}
