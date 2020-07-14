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
import { ThemeState } from '../states/theme.state';
import { ThemeService } from './theme.service';

@Injectable()
export class ProjectService {

  private static readonly PROJECT_FILTER = {name: 'Akos Project', extensions: ['akp']};

  constructor(
    private router: Router,
    private nativeService: NativeService,
    private gameService: GameService,
    private themeService: ThemeService,
    private scenesService: ScenesService,
    private projectState: ProjectState,
    private gameState: GameState,
    private themeState: ThemeState,
    private scenesState: ScenesState
  ) {

    merge(
      gameState.observe(),
      themeState.observe(),
      scenesState.observe()
    )
      .pipe(filter(() => !!projectState.get()))
      .subscribe(() => projectState.setSaved(false));

    projectState
      .observe()
      .pipe(
        debounceTime(2000),
        filter(project => project && !project.saved && !project.building)
      )
      .subscribe(() => this.saveProject());
  }

  async createProject(file?: string) {

    if (!file) {
      this.router.navigateByUrl('/create-project');
      this.resetProject()
      return;
    }

    await this.buildProjectState(file);
    await this.saveProject();
    this.router.navigateByUrl('/game');
  }

  closeProject() {
    this.resetProject()
    this.router.navigateByUrl('/welcome');
  }

  async saveProject() {
    if (this.projectState.get() && !this.projectState.get().saved) {
      await this.nativeService.writeFile(this.projectState.get().file, JSON.stringify(this.getGameDescriptor()));
      this.projectState.setSaved(true);
    }
  }

  async loadProject() {

    let file = await this.nativeService.showOpenDialog([ProjectService.PROJECT_FILTER]);

    if (file) {

      let data = JSON.parse(await this.nativeService.readFile(file));
      data.game.akosVersion = version;

      this.gameState.set(data.game);
      this.themeState.set(data.theme);
      this.scenesState.set(data.scenes);
      await this.buildProjectState(file);
      await this.router.navigateByUrl('/game');
    }
  }

  async isAkosDir(projectDir): Promise<boolean> {
    return projectDir && (await this.nativeService.readDir(projectDir)).filter(file => file.endsWith('.akp')).length > 0;
  }

  private resetProject() {
    this.projectState.set(null);
    this.gameService.resetGame();
    this.themeService.resetTheme();
    this.scenesService.resetScenes();
  }

  private getGameDescriptor(): GameDescriptor {
    return {
      game: this.gameState.get(),
      scenes: this.scenesState.get(),
      theme: this.themeState.get()
    };
  }

  private async buildProjectState(projectFile: string) {

    let projectDir = projectFile.substring(0, projectFile.lastIndexOf('/'));

    this.projectState.set({
      file: projectFile,
      dir: projectDir,
      assetsDir: `${projectDir}/assets`,
      distDir: `${projectDir}/dist`,
      saved: true,
      building: false
    });

    await this.nativeService.ensureDir(this.projectState.get().assetsDir);
  }
}
