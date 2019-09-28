import {projectReducer} from './reducers/project.reducer';
import {uiReducer} from './reducers/ui.reducer';
import {sceneReducer} from './reducers/scene.reducer';

export const coreReducers = {
  project: projectReducer,
  ui: uiReducer,
  scenes: sceneReducer
};
