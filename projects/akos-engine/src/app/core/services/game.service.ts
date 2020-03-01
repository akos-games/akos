import { Injectable } from '@angular/core';
import { StatefulService } from 'akos-common';
import { GameRun } from '../types/game-run';
import { GameDescriptorService } from './game-descriptor.service';
import { filter } from 'rxjs/operators';
import { SceneService } from './scene.service';

@Injectable()
export class GameService extends StatefulService<GameRun> {

  constructor(private gameDescriptorService: GameDescriptorService, private sceneService: SceneService) {
    super();
    this.sceneService.getObservable().subscribe(sceneRun => this.setState({...this.getState(), currentScene: sceneRun}));

    // TODO remove when main menu is implemented
    this.gameDescriptorService.getObservable()
      .pipe(filter(gameDescriptor => !!gameDescriptor))
      .subscribe(() => this.newGame());
  }

  newGame() {
    this.resetState();
    this.sceneService.startScene(this.gameDescriptorService.getDescriptor().game.firstSceneId);
  }

  protected getInitialState(): GameRun {
    return {
      currentScene: null
    };
  }
}
