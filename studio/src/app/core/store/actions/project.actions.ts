import {createAction, props} from '@ngrx/store';
import {ApplicationState} from '../../types/application-state';

export const ProjectActions = {
  create: createAction('[Project] Create'),
  load: createAction('[Project] Load'),
  loaded: createAction('[Project] Loaded', props<{applicationState: ApplicationState}>()),
  save: createAction('[Project] Save'),
  saveAs: createAction('[Project] Save As')
};
