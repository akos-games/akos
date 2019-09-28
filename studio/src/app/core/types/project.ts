import {Metadata} from './metadata';

export interface Project {
  version: string;
  file: string;
  metadata: Metadata;
}
