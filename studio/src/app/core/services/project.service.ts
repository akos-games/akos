import {Injectable} from '@angular/core';
import {GameDescriptorService} from './game-descriptor.service';
import {FileService} from './file.service';
import {Project} from '../models/project';

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

  public openProject(): void {

    (async () => {

      await this.selectProjectFile();
      if (this.projectFile) {
        let data = await this.fileService.readFile(this.projectFile);
        let project: Project = JSON.parse(data);
        this.gameDescriptorService.loadGameDescriptor(project.gameDescriptor, project.uidSequence);
      }

    })();
  }

  public saveProject(): void {

    (async () => {

      if (!this.projectFile) {
        await this.selectProjectFile(true);
      }

      this.saveProjectFile();
    })();
  }

  public saveProjectAs(): void {

    (async () => {
      await this.selectProjectFile(true);
      this.saveProjectFile();
    })();
  }

  private async selectProjectFile(allowCreate?: boolean): Promise<void> {

    let filters =  [{name: 'Akos Project', extensions: ['akp']}];
    let file = null;

    if (allowCreate) {
      file = await this.fileService.selectNewFile(filters);
    } else {
      file = await this.fileService.selectExistingFile(filters);
    }

    // File selection could have been cancelled by user
    if (file) {
      this.projectFile = file;
      this.projectFolder = file.slice(file.lastIndexOf('/'));
    }
  }

  private async saveProjectFile(): Promise<void> {

    if (!this.projectFile) {
      return;
    }

    await this.fileService.writeFile(this.projectFile, JSON.stringify({
      uidSequence: this.gameDescriptorService.getUidSequence(),
      gameDescriptor: this.gameDescriptorService.getGameDescriptor()
    }));
  }
}
