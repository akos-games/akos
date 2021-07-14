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
import packageInfo from  '../../../../../../package.json';
import { ThemeState } from '../states/theme.state';
import { ThemeService } from './theme.service';
import { SoundtrackState } from '../states/soundtrack.state';
import { SoundtrackService } from './soundtrack.service';

@Injectable()
export class ProjectService {

  private static readonly PROJECT_FILTER = {name: 'Akos Project', extensions: ['akp']};

  constructor(
    private router: Router,
    private nativeService: NativeService,
    private gameService: GameService,
    private themeService: ThemeService,
    private scenesService: ScenesService,
    private soundtrackService: SoundtrackService,
    private projectState: ProjectState,
    private gameState: GameState,
    private themeState: ThemeState,
    private scenesState: ScenesState,
    private soundtrackState: SoundtrackState
  ) {

    merge(
      gameState.observe(),
      scenesState.observe(),
      soundtrackState.observe(),
      themeState.observe()
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
      await this.router.navigateByUrl('/create-project');
      this.resetProject()
      return;
    }

    await this.buildProjectState(file);
    await this.saveProject();
    await this.router.navigateByUrl('/game');
  }

  closeProject() {
    this.resetProject()
    this.router.navigateByUrl('/welcome');
  }

  async saveProject() {
    if (this.projectState.get() && !this.projectState.get().saved) {
      await this.nativeService.writeFile(this.projectState.get().file, JSON.stringify(this.getGameDescriptor(), null, 2));
      this.projectState.setSaved(true);
    }
  }

  async loadProject() {

    let file = await this.nativeService.showOpenDialog([ProjectService.PROJECT_FILTER]);

    if (file) {

      let gameDescriptor: GameDescriptor = JSON.parse(await this.nativeService.readFile(file));
      gameDescriptor.game.akosVersion = packageInfo.version;

      this.gameState.set(gameDescriptor.game);
      this.scenesState.set(gameDescriptor.scenes);
      this.soundtrackState.set(gameDescriptor.soundtrack);
      this.themeState.set(gameDescriptor.theme);
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
    this.scenesService.resetScenes();
    this.soundtrackService.resetSoundtrack();
    this.themeService.resetTheme();
  }

  private getGameDescriptor(): GameDescriptor {
    return {
      game: this.gameState.get(),
      scenes: this.scenesState.get(),
      soundtrack: this.soundtrackState.get(),
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
