import { Command } from 'akos-common/types/command';

export interface Scene {
  id: number;
  name?: string;
  comment?: string;
  commands: Command[];
}
