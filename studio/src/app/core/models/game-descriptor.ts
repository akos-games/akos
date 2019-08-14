import {GameMetadata} from './game-metadata';
import {Scene} from './scene';

export class GameDescriptor {
  uidSequence: number = 0;
  gameMetadata: GameMetadata;
  scenes: Scene[] = [];
}
