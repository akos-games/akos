import { Injectable } from '@angular/core';
import { GameDescriptor, NativeService, NativeState } from 'akos-common';
import { filter } from 'rxjs/operators';
import { GameDescriptorState } from '../states/game-descriptor.state';
import { GameService } from './game.service';
import { SettingsService } from './settings.service';

@Injectable()
export class ApplicationService {

  constructor(
    private nativeState: NativeState,
    private nativeService: NativeService,
    private gameService: GameService,
    private settingsService: SettingsService,
    private gameDescriptorState: GameDescriptorState
  ) {
  }

  start() {

    this.nativeState.getObservable()
      .pipe(filter(nativeContext => !!nativeContext))
      .subscribe(async () => {
        await this.settingsService.loadSettings();
        let gameDescriptor = await this.loadGameDescriptor();
        this.nativeService.setWindowTitle(gameDescriptor.game.name);
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
