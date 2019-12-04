import { Injectable } from '@angular/core';
import { ProjectStore } from '../stores/project.store';
import { SceneStore } from '../stores/scene.store';
import { FileService } from './file.service';
import { getDirectory } from 'akos-common/utils/file';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private static readonly PROJECT_FILTER = {name: 'Akos Project', extensions: ['akp']};

  constructor(
    private fileService: FileService,
    private projectStore: ProjectStore,
    private sceneStore: SceneStore
  ) {}

  async saveProject(changeCurrentLocation = false) {

    let projectState = this.projectStore.getState();

    if (!projectState.file || changeCurrentLocation) {

      let file = await this.fileService.selectNewFile([ProjectService.PROJECT_FILTER]);
      if (!file) {
        // Selection has been cancelled
        return;
      }

      if (!await this.fileService.checkProjectDir(file)) {
        // TODO display a notification
        return;
      }

      projectState.file = file;
      this.projectStore.updateState(projectState);
    }

    await this.fileService.writeFile(projectState.file, JSON.stringify(this.getProjectDescriptor()));
  }

  async loadProject() {

    let file = await this.fileService.selectExistingFile([ProjectService.PROJECT_FILTER]);
    let data = JSON.parse(await this.fileService.readFile(file));

    this.projectStore.updateState({...data.project, file: file});
    this.sceneStore.updateState(data.scenes);
  }

  resetProject() {
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
