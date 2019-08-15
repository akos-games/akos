import {GameMetadata} from './game-metadata';
import {Scene} from './scene';

export interface GameDescriptor {
  uidSequence: number;
  gameMetadata: GameMetadata;
  scenes: {[uid: string]: Scene};
}
