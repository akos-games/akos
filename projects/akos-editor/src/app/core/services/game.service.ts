import { Injectable } from '@angular/core';
import { Game } from 'akos-common';
import { GameState } from '../states/game.state';

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
      akosVersion: '0.1',
      firstSceneId: null
    });
  }
}
