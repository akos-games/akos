import { Injectable } from '@angular/core';
import { GameDescriptor, NativeService, NativeState, sanitizeGameName } from 'akos-common';
import { filter, first } from 'rxjs/operators';
import { GameDescriptorState } from '../states/game-descriptor.state';
import { GameService } from './game.service';
import { SettingsService } from './settings.service';
import { ApplicationState } from '../states/application.state';
import { SaveService } from './save.service';

@Injectable()
export class ApplicationService {

  constructor(
    private applicationState: ApplicationState,
    private nativeState: NativeState,
    private gameDescriptorState: GameDescriptorState,
    private nativeService: NativeService,
    private gameService: GameService,
    private settingsService: SettingsService,
    private saveService: SaveService
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
        let sanitizedGameName = sanitizeGameName(this.gameDescriptorState.get().game.name);
        let gameDir = `${this.nativeService.getAppDataDir()}/Akos Engine/${sanitizedGameName}`;
        let application = {
          gameDir,
          savesDir: `${gameDir}/saves`,
          tempDir: `${this.nativeService.getTempDir()}/Akos Engine/${sanitizedGameName}`
        }

        this.applicationState.set(application);
        this.nativeService.setAppName(gameDescriptor.game.name);

        await this.nativeService.ensureDir(application.tempDir);
        await this.nativeService.ensureDir(application.savesDir);

        await this.settingsService.loadSettings();
        await this.saveService.updateSaveState();
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
