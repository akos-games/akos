import { Injectable } from '@angular/core';
import { StatefulService } from 'akos-common';
import { Game } from 'akos-common';

@Injectable()
export class GameService extends StatefulService<Game> {

  constructor() {
    super();
  }

  setGame(game: Partial<Game>) {
    this.setState({...this.getState(), ...game});
  }

  resetGame() {
    this.resetState();
  }

  protected getInitialState(): Game {
    return {
      name: '',
      version: '',
      akosVersion: '',
      firstSceneId: null
    }
  }
}
