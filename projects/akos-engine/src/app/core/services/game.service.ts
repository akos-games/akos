import { Injectable } from '@angular/core';
import { SceneService } from './scene.service';
import { GameDescriptorState } from '../states/game-descriptor.state';
import { GameState } from '../states/game.state';

@Injectable()
export class GameService {

  constructor(
    private gameState: GameState,
    private gameDescriptorState: GameDescriptorState,
    private sceneService: SceneService
  ) {
  }

  newGame() {

    this.gameState.set({
      scene: null
    });

    this.gameState.applyChanges();
    this.sceneService.startScene(this.gameDescriptorState.get().game.firstSceneId);
  }
}
