import { Injectable } from '@angular/core';
import { deepCopy, State } from 'akos-common';
import { Game } from '../types/game';

@Injectable()
export class GameState extends State<Game> {

  private unpublishedState: Game;

  constructor() {
    super();
    this.unpublishedState = this.subject$.getValue();
  }

  get(): Game {
    return deepCopy(this.unpublishedState);
  }

  set(game: Game) {
    this.unpublishedState = deepCopy(game);
  }

  applyChanges() {
    super.set(this.unpublishedState);
  }

  reset() {
    this.set({
      sessionStart: null,
      playTime: 0,
      scene: null
    });
  }
}
