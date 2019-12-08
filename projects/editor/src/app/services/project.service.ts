import { Injectable } from '@angular/core';
import { ProjectStore } from '../stores/project.store';
import { SceneStore } from '../stores/scene.store';
import { FileService } from './file.service';
import { getDirectory } from 'akos-common/utils/file';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private static readonly PROJECT_FILTER = {name: 'Akos Project', extensions: ['akp']};

  constructor(
    private router: Router,
    private fileService: FileService,
    private projectStore: ProjectStore,
    private sceneStore: SceneStore
  ) {}

  async saveProject() {

    let project = this.projectStore.getState();

    if (!project) {

      let file = await this.fileService.selectNewFile([ProjectService.PROJECT_FILTER]);
      if (!file) {
        // Selection has been cancelled
        return;
      }

      if (!await this.fileService.checkProjectDirectory(file)) {
        // TODO display a notification
        return;
      }

      let projectDirectory = getDirectory(file);

      project = {
        name: '',
        version: '',
        engineVersion: '0.1',
        file: file,
        paths: {
          project: projectDirectory,
          assets: `${projectDirectory}/assets`
        }
      };

      this.projectStore.updateState(project);
      this.router.navigateByUrl('metadata');
    }

    await this.fileService.writeFile(project.file, JSON.stringify(this.getProjectDescriptor()));
  }

  async loadProject() {

    let file = await this.fileService.selectExistingFile([ProjectService.PROJECT_FILTER]);

    if (file) {
      let data = JSON.parse(await this.fileService.readFile(file));
      this.projectStore.updateState({...data.project, file: file});
      this.sceneStore.updateState(data.scenes);
      this.router.navigateByUrl('metadata');
    }
  }

  closeProject() {
    this.projectStore.resetState();
    this.sceneStore.resetState();
  }

  async buildGame() {

    let projectFile = this.projectStore.getState().file;
    if (!projectFile) {
      await this.saveProject();
    }

    if (projectFile) {
      await this.fileService.buildGame(getDirectory(projectFile), this.getGameDescriptor());
    }
  }

  private getProjectDescriptor() {
    return {
      project: {...this.projectStore.getState(), file: null},
      scenes: this.sceneStore.getState()
    }
  }

  private getGameDescriptor() {

    let projectState = this.projectStore.getState();

    return {
      name: projectState.name,
      akosVersion: '0.1.0'
    }
  }
}
