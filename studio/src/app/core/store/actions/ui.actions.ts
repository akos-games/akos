import {createAction, props} from '@ngrx/store';
import {Node} from '../../types/node';

export const UiActions = {
  openNode: createAction('[UI] Open Node', props<{node: Node}>()),
  closeNode: createAction('[UI] Close Node', props<{id: string}>()),
  selectNode: createAction('[UI] Select Node', props<{id: string}>())
};
