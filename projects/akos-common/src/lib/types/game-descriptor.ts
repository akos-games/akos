import { Scene } from './scene';
import { Game } from './game';
import { Theme } from './theme';

export interface GameDescriptor {
  game: Game;
  theme: Theme;
  scenes: Scene[];
}
