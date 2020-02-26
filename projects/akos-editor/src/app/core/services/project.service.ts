import { Injectable } from '@angular/core';
import { FileService } from './file.service';
import { Router } from '@angular/router';
import { SceneService } from './scene.service';
import { Project } from '../types/project';
import { getDirectory, StatefulService } from 'akos-common';
import { GameDescriptor } from 'akos-common';
import { GameService } from './game.service';
import { ProjectDescriptor } from '../types/project-descriptor';

@Injectable()
export class ProjectService extends StatefulService<Project> {

  private static readonly PROJECT_FILTER = {name: 'Akos Project', extensions: ['akp']};

  constructor(
    private router: Router,
    private fileService: FileService,
    private gameService: GameService,
    private sceneService: SceneService
  ) {
    super();
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
      this.gameService.setGame(data.game);
      this.sceneService.resetScenes(data.scenes);
      this.router.navigateByUrl('metadata');
    }
  }

  closeProject() {
    this.resetState();
    this.gameService.resetGame();
    this.sceneService.resetScenes();
    this.router.navigateByUrl('');
  }

  async buildGame() {
    await this.saveProject();
    await this.fileService.buildGame(getDirectory(this.getState().file), this.getGameDescriptor());
  }

  private getProjectDescriptor(): ProjectDescriptor {
    return {
      project: this.getState(),
      ...this.getGameDescriptor()
    };
  }

  private getGameDescriptor(): GameDescriptor {

    this.sceneService.cleanCommands();

    return {
      game: this.gameService.getState(),
      scenes: this.sceneService.getState()
    };
  }
}
