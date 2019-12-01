import { Injectable } from '@angular/core';
import { Store } from 'akos-common/utils/store/store';
import { GameDescriptor } from 'akos-common/types/game-descriptor';

@Injectable({
  providedIn: 'root'
})
export class GameDescriptorStore extends Store<GameDescriptor> {

  protected getInitialState(): GameDescriptor {
    return undefined;
  }
}
