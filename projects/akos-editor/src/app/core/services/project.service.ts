import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ScenesService } from './scenes.service';
import { GameDescriptor, NativeService } from 'akos-common';
import { GameService } from './game.service';
import { GameState } from '../states/game.state';
import { ScenesState } from '../states/scenes.state';
import { ProjectState } from '../states/project.state';

@Injectable()
export class ProjectService {

  private static readonly PROJECT_FILTER = {name: 'Akos Project', extensions: ['akp']};

  constructor(
    private router: Router,
    private nativeService: NativeService,
    private gameService: GameService,
    private scenesService: ScenesService,
    private projectState: ProjectState,
    private gameState: GameState,
    private scenesState: ScenesState
  ) {
  }

  async saveProject() {

    let project = this.projectState.get();
    if (!project) {

      let file = await this.nativeService.showOpenDialog([ProjectService.PROJECT_FILTER], {create: true});
      if (!file) {
        // Selection has been cancelled
        return;
      }

      if (!this.checkProjectDirIntegrity()) {
        // TODO display a notification
        return;
      }

      this.buildProjectState(file);
      this.router.navigateByUrl('game');
    }

    this.nativeService.writeFile(this.projectState.get().file, JSON.stringify(this.getGameDescriptor()));
  }

  async loadProject() {

    let file = await this.nativeService.showOpenDialog([ProjectService.PROJECT_FILTER]);

    if (file) {

      let data = JSON.parse(this.nativeService.readFile(file));
      data.game.akosVersion = '0.1';

      this.buildProjectState(file);
      this.gameState.set(data.game);
      this.scenesState.set(data.scenes);
      this.router.navigateByUrl('game');
    }
  }

  closeProject() {
    this.projectState.set(null);
    this.gameService.resetGame();
    this.scenesService.resetScenes();
    this.router.navigateByUrl('');
  }

  private checkProjectDirIntegrity() {

    let projectDir = this.projectState.get().dir;
    let projectFile = this.projectState.get().file;

    let otherProjectFileCount = this.nativeService.readDir(projectDir)
      .filter(file => file.endsWith('.akp') && `${projectDir}/${file}` !== projectFile)
      .length;

    return otherProjectFileCount === 0;
  }

  private getGameDescriptor(): GameDescriptor {

    this.scenesService.cleanCommands();

    return {
      game: this.gameState.get(),
      scenes: this.scenesState.get()
    };
  }

  private buildProjectState(projectFile: string) {

    let projectDir = projectFile.substring(0, projectFile.lastIndexOf('/') - 1);

    this.projectState.set({
      file: projectFile,
      dir: projectDir,
      assetsDir: `${projectDir}/assets`,
      distDir: `${projectDir}/dist`
    });
  }
}
