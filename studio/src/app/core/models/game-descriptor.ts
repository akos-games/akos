import {GameMetadata} from './game-metadata';
import {Scene} from './scene';

export interface GameDescriptor {
  metadata: GameMetadata;
  scenes: {[uid: string]: Scene};
}
