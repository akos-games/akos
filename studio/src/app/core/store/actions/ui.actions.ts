import {createAction, props} from '@ngrx/store';
import {Node} from '../../types/node';

export const openNode = createAction('[UI] Open Node', props<{node: Node}>());
export const closeNode = createAction('[UI] Close Node', props<{id: string}>());
export const selectNode = createAction('[UI] Select Node', props<{id: string}>());
