import { Game } from './game';

export interface Save {
  id: string;
  date: number;
  game: Game;
}
