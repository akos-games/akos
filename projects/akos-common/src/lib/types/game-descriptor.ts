import { Scene } from './scene';

export interface GameDescriptor {
  name: string;
  akosVersion: string;
  firstSceneId;
  scenes: Scene[];
}
