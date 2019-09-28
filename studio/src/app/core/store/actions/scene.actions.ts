import {createAction, props} from '@ngrx/store';
import {Scene} from '../../types/scene';
import {Update} from '@ngrx/entity';

export const addScene = createAction('[Scene] Add', props<{scene: Scene}>());
export const updateScene = createAction('[Scene] Update', props<{scene: Update<Scene>}>());
export const deleteScene = createAction('[Scene] Delete', props<{id: number}>());
