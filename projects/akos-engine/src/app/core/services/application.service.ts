import { Injectable } from '@angular/core';
import { GameDescriptor, NativeService, NativeState, sanitizeGameName } from 'akos-common';
import { filter, first } from 'rxjs/operators';
import { GameDescriptorState } from '../states/game-descriptor.state';
import { GameService } from './game.service';
import { SettingsService } from './settings.service';
import { ApplicationState } from '../states/application.state';
import { SaveService } from './save.service';
import { UiService } from './ui.service';

@Injectable()
export class ApplicationService {

  constructor(
    private applicationState: ApplicationState,
    private nativeState: NativeState,
    private gameDescriptorState: GameDescriptorState,
    private nativeService: NativeService,
    private gameService: GameService,
    private settingsService: SettingsService,
    private saveService: SaveService,
    private uiService: UiService
  ) {
  }

  start() {

    this.nativeState.observe()
      .pipe(
        filter(nativeContext => !!nativeContext),
        first()
      )
      .subscribe(async () => {

        let gameDescriptor = await this.loadGameDescriptor();
        let sanitizedGameName = sanitizeGameName(gameDescriptor.game.name);

        this.nativeService.setAppName(gameDescriptor.game.name);

        let gameDir = this.nativeState.get().appDataDir;
        let application = {
          gameDir,
          savesDir: `${gameDir}/saves`,
          tempDir: `${this.nativeService.getTempDir()}/${sanitizedGameName}`
        }

        this.applicationState.set(application);

        await this.nativeService.ensureDir(application.tempDir);
        await this.nativeService.ensureDir(application.savesDir);

        await this.settingsService.loadSettings();
        await this.saveService.updateSaveState();

        this.nativeService.beforeExit(() => this.uiService.confirmQuitApp());
      });
  }

  exit() {
    this.nativeService.exit();
  }

  private async loadGameDescriptor(): Promise<GameDescriptor> {

    let file = `${this.nativeState.get().workingDir}/game-descriptor.akg`;
    let gameDescriptor = JSON.parse(await this.nativeService.readFile(file));

    this.gameDescriptorState.set(gameDescriptor);
    return gameDescriptor;
  }
}
