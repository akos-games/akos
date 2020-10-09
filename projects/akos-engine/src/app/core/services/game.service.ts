import { Injectable } from '@angular/core';
import { SceneService } from './scene.service';
import { GameDescriptorState } from '../states/game-descriptor.state';
import { GameState } from '../states/game.state';
import { Router } from '@angular/router';

@Injectable()
export class GameService {

  constructor(
    private router: Router,
    private gameState: GameState,
    private gameDescriptorState: GameDescriptorState,
    private sceneService: SceneService
  ) {
  }

  newGame() {

    this.gameState.set({
      sessionStart: new Date().getTime(),
      playTime: 0,
      scene: null
    });

    this.gameState.applyChanges();
    this.sceneService.startScene(this.gameDescriptorState.get().game.firstSceneId);
    this.router.navigateByUrl('/scene');
  }

  exitGame() {

    this.router.navigateByUrl('/main-menu');

    this.gameState.reset();
    this.gameState.applyChanges();
  }
}
