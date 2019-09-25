import {Project} from './project';
import {Ui} from './ui';
import {EntityState} from '@ngrx/entity';
import {Scene} from './scene';

export interface ApplicationState {
  project: Project;
  ui: Ui;
  scenes: EntityState<Scene>;
}
