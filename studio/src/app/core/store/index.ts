import {projectReducer} from './reducers/project.reducer';
import {uiReducer} from './reducers/ui.reducer';
import {sceneReducer} from './reducers/scene.reducer';
import { MetaReducer } from '@ngrx/store';

export const coreReducers = {
  project: projectReducer,
  ui: uiReducer,
  scenes: sceneReducer
};
