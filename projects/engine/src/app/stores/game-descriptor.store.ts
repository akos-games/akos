import { GameDescriptor } from '../types/game-descriptor';
import { Store } from '../utils/store/store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDescriptorStore extends Store<GameDescriptor> {

  protected getInitialState(): GameDescriptor {
    return undefined;
  }
}
