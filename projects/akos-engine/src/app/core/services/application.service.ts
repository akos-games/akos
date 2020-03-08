import { Injectable } from '@angular/core';
import { GameDescriptor, NativeService, NativeState } from 'akos-common';
import { filter } from 'rxjs/operators';
import { GameDescriptorState } from '../states/game-descriptor.state';
import { GameService } from './game.service';

@Injectable()
export class ApplicationService {

  constructor(
    private nativeState: NativeState,
    private nativeService: NativeService,
    private gameService: GameService,
    private gameDescriptorState: GameDescriptorState
  ) {
  }

  start() {

    this.nativeState.getObservable()
      .pipe(filter(nativeContext => !!nativeContext))
      .subscribe(() => {
        let gameDescriptor = this.loadGameDescriptor();
        this.nativeService.setWindowTitle(gameDescriptor.game.name);
        this.gameService.newGame();
      });
  }

  private loadGameDescriptor(): GameDescriptor {

    let file = `${this.nativeState.get().workingDir}/game-descriptor.akg`;
    let gameDescriptor = JSON.parse(this.nativeService.readFile(file));

    this.gameDescriptorState.set(gameDescriptor);
    return gameDescriptor;
  }
}
