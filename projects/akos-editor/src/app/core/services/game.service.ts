import { Injectable } from '@angular/core';
import { Game } from 'akos-common';
import { GameState } from '../states/game.state';
import { version } from  '../../../../../../package.json';

@Injectable()
export class GameService {

  constructor(private gameState: GameState) {
    this.resetGame();
  }

  updateGame(game: Game) {
    this.gameState.set(game);
  }

  resetGame() {
    this.gameState.set({
      name: '',
      version: '',
      akosVersion: version,
      firstSceneId: null
    });
  }
}
