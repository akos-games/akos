import { Scene } from 'akos-common/types/scene';

export interface GameDescriptor {
  name: string;
  akosVersion: string;
  firstSceneId;
  scenes: Scene[];
}
