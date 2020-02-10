import { Command } from './command';

export interface Scene {
  id: number;
  name?: string;
  comment?: string;
  commands: Command[];
}
