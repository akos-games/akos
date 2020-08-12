import { Injectable } from '@angular/core';
import { deepCopy, State } from 'akos-common';

export interface Game {
  scene: {
    sceneId: number;
    commandIndex: number;
    picture: {
      asset: string;
      fullscreen: boolean;
    },
    text: {
      content: string;
      visible: boolean;
    },
    playerChoices: {
      text: string;
      toCommand: number;
    }[]
  }
}

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
}
