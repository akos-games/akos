import { Injectable } from '@angular/core';
import { FileService } from './file.service';
import { Router } from '@angular/router';
import { SceneService } from './scene.service';
import { Project } from '../types/project';
import { getDirectory, StatefulService } from 'akos-common';
import { GameDescriptor } from 'akos-common';

@Injectable()
export class ProjectService extends StatefulService<Project> {

  private static readonly PROJECT_FILTER = {name: 'Akos Project', extensions: ['akp']};

  constructor(
    private router: Router,
    private fileService: FileService,
    private sceneService: SceneService
  ) {
    super();
  }

  protected getInitialState(): Project {
    return undefined;
  }

  async saveProject() {

    let project = this.getState();

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

      this.setState(project);
      this.router.navigateByUrl('metadata');
    }

    await this.fileService.writeFile(project.file, JSON.stringify(this.getProjectDescriptor()));
  }

  async loadProject() {

    let file = await this.fileService.selectExistingFile([ProjectService.PROJECT_FILTER]);

    if (file) {

      let data = JSON.parse(await this.fileService.readFile(file));

      let projectDirectory = getDirectory(file);
      data.project.file = file;
      data.project.paths = {
        project: projectDirectory,
        assets: `${projectDirectory}/assets`
      };

      this.setState(data.project);
      this.sceneService.resetScenes(data.scenes);
      this.router.navigateByUrl('metadata');
    }
  }

  closeProject() {
    this.resetState();
    this.sceneService.resetScenes();
  }

  async buildGame() {

    let projectFile = this.getState().file;
    if (!projectFile) {
      await this.saveProject();
    }

    if (projectFile) {
      await this.fileService.buildGame(getDirectory(projectFile), this.getGameDescriptor());
    }
  }

  setMetadata(metadata) {

    let state = this.getState();

    state.name = metadata.name;
    state.version = metadata.version;
    state.firstSceneId = metadata.firstSceneId;

    this.setState(state);
  }

  private getProjectDescriptor() {

    this.sceneService.cleanCommands();

    return {
      project: {...this.getState(), file: null},
      scenes: this.sceneService.getState()
    }
  }

  private getGameDescriptor(): GameDescriptor {

    let projectState = this.getState();
    this.sceneService.cleanCommands();

    return {
      game: {
        name: projectState.name,
        akosVersion: '0.1.0',
        firstSceneId: projectState.firstSceneId
      },
      scenes: this.sceneService.getState()
    }
  }
}
