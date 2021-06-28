import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { NativeService } from 'akos-common';
import { ProjectState } from '../states/project.state';
import { UiService } from './ui.service';
import { version } from  '../../../../../../package.json';
import { GameState } from '../states/game.state';

@Injectable()
export class ApplicationService {

  constructor(
    private projectService: ProjectService,
    private nativeService: NativeService,
    private uiService: UiService,
    private projectState: ProjectState,
    private gameState: GameState
  ) {
    this.gameState.observe().subscribe(game =>
      this.nativeService.setWindowTitle(`${game?.name && game.name + ' - ' || ''}Akos Editor`)
    );
  }

  async closeApp() {
    await this.projectService.saveProject();
    this.nativeService.exit();
  }

  async openDistDir() {

    if (this.projectState.get()) {

      let distDir = this.projectState.get().distDir;
      if (!await this.nativeService.exists(distDir)) {
        this.uiService.notify('Game has not been built yet');
      } else {
        await this.nativeService.desktopOpen(distDir);
      }
    }
  }

  async openDocumentation() {
    await this.nativeService.desktopOpen(`https://github.com/grimwred/akos/blob/v${version}/docs/quickstart.md`);
  }

  async openContributors() {
    await this.nativeService.desktopOpen('https://github.com/akosgames/akos/blob/master/CONTRIBUTORS.md');
  }
}
