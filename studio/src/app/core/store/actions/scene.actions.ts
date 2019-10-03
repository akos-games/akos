import {createAction, props} from '@ngrx/store';
import {Scene} from '../../types/scene';
import {Update} from '@ngrx/entity';

export const SceneActions = {
  addScene: createAction('[Scene] Add', props<{scene: Scene}>()),
  updateScene: createAction('[Scene] Update', props<{scene: Update<Scene>}>()),
  deleteScene: createAction('[Scene] Delete', props<{id: number}>())
};
