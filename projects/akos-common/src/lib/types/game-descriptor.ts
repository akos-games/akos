import { Scene } from './scene';

export interface GameDescriptor {
  game: {
    name: string;
    akosVersion: string;
    firstSceneId: number;
  };
  scenes: Scene[];
}
