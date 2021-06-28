import { Scene } from './scene';
import { Game } from './game';
import { Theme } from './theme';
import { Track } from './track';

export interface GameDescriptor {
  game: Game;
  theme: Theme;
  soundtrack: Track[];
  scenes: Scene[];
}
