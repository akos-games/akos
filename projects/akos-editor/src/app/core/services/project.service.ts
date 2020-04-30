import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ScenesService } from './scenes.service';
import { GameDescriptor, NativeService } from 'akos-common';
import { GameService } from './game.service';
import { GameState } from '../states/game.state';
import { ScenesState } from '../states/scenes.state';
import { ProjectState } from '../states/project.state';
import { merge } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { version } from  '../../../../../../package.json';

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

    merge(
      gameState.getObservable(),
      scenesState.getObservable()
    )
      .subscribe(() => {
        let project = projectState.get();
        if (project) {
          project.saved = false;
          projectState.set(project);
        }
      });

    projectState
      .getObservable()
      .pipe(
        debounceTime(2000),
        filter(project => project && !project.saved)
      )
      .subscribe(() => this.saveProject());
  }

  createProject(file?: string) {

    if (!file) {
      this.router.navigateByUrl('/create-project');
      this.resetProject()
      return;
    }

    this.buildProjectState(file);
    this.saveProject();
    this.router.navigateByUrl('/game');
  }

  closeProject() {
    this.resetProject()
    this.router.navigateByUrl('/welcome');
  }

  async saveProject() {
    let project = this.projectState.get();
    this.nativeService.writeFile(this.projectState.get().file, JSON.stringify(this.getGameDescriptor()));
    project.saved = true;
    this.projectState.set(project);
  }

  async loadProject() {

    let file = await this.nativeService.showOpenDialog([ProjectService.PROJECT_FILTER]);

    if (file) {

      let data = JSON.parse(this.nativeService.readFile(file));
      data.game.akosVersion = version;

      this.gameState.set(data.game);
      this.scenesState.set(data.scenes);
      this.buildProjectState(file);
      this.router.navigateByUrl('/game');
    }
  }

  isAkosDir(projectDir): boolean {
    return projectDir && this.nativeService.readDir(projectDir).filter(file => file.endsWith('.akp')).length > 0;
  }

  private resetProject() {
    this.projectState.set(null);
    this.gameService.resetGame();
    this.scenesService.resetScenes();
  }

  private getGameDescriptor(): GameDescriptor {
    return {
      game: this.gameState.get(),
      scenes: this.scenesState.get()
    };
  }

  private buildProjectState(projectFile: string) {

    let projectDir = projectFile.substring(0, projectFile.lastIndexOf('/'));

    this.projectState.set({
      file: projectFile,
      dir: projectDir,
      assetsDir: `${projectDir}/assets`,
      distDir: `${projectDir}/dist`,
      saved: true
    });

    this.nativeService.ensureDir(this.projectState.get().assetsDir);
  }
}
