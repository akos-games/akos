import {createAction, props} from '@ngrx/store';
import {Scene} from '../../../../core/types/scene';
import {Update} from '@ngrx/entity';

export const addScene = createAction('[Scene] Add', props<{scene: Scene}>());
export const updateScene = createAction('[Scene] Update', props<{scene: Update<Scene>}>());
export const copyScene = createAction('[Scene] Copy', props<{id: number}>());
export const deleteScene = createAction('[Scene] Delete', props<{id: number}>());
