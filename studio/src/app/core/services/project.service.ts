import {EventEmitter, Injectable} from '@angular/core';
import {ProjectNode} from '../models/project-node';
import {GameDescriptorService} from './game-descriptor.service';
import {GameDescriptor} from '../models/game-descriptor';
import {Scene} from '../models/scene';
import {FileService} from './file.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectFile: string;
  private projectFolder: string;

  constructor(private gameDescriptorService: GameDescriptorService, private fileService: FileService) {
  }

  public createProject(): void {
    this.projectFile = null;
    this.projectFolder = null;
    this.gameDescriptorService.createGameDescriptor();
  }

  public saveProject(): void {

    (async () => {

      if (!this.projectFile) {
        await this.selectProjectFile();
      }

      this.saveProjectFile();
    })();
  }

  public saveProjectAs(): void {

    (async () => {
      await this.selectProjectFile();
      this.saveProjectFile();
    })();
  }

  private async selectProjectFile(): Promise<void> {

    this.projectFile = await this.fileService.selectFile([{name: 'Akos Project', extensions: ['akp']}]);

    // File selection could have been cancelled by user
    if (this.projectFile) {
      this.projectFolder = this.projectFile.slice(this.projectFile.lastIndexOf('/'));
    }
  }

  private async saveProjectFile(): Promise<void> {

    await this.fileService.writeFile(this.projectFile, JSON.stringify({
      uidSequence: this.gameDescriptorService.getUidSequence(),
      gameDescriptor: this.gameDescriptorService.getGameDescriptor()
    }));
  }
}
