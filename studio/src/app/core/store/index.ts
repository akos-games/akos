import {projectReducer} from './reducers/project.reducer';
import {uiReducer} from './reducers/ui.reducer';

export const coreReducers = {
  project: projectReducer,
  ui: uiReducer
};
