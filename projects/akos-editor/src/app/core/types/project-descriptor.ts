import { GameDescriptor } from 'akos-common';
import { Project } from './project';

export interface ProjectDescriptor extends GameDescriptor {
  project: Project;
}
