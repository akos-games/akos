import { Command } from 'akos-common/types/command';

export interface Scene {
  id: number;
  name?: string;
  commands: Command[];
}
