import { Scene } from 'akos-common/types/scene';

export interface GameDescriptor {
  name: string;
  akosVersion: string;
  scenes: Scene[];
}
