import { Command } from './command';

export interface Scene {
  id: number;
  name?: string;
  comments?: string;
  commands: Command[];
}
