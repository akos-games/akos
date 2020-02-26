import { Scene } from './scene';
import { Game } from './game';

export interface GameDescriptor {
  game: Game;
  scenes: Scene[];
}
