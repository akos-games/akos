import { ActionReducer, MetaReducer } from '@ngrx/store';
import { ProjectActions } from './actions/project.actions';

function reset(reducer: ActionReducer<any>): ActionReducer<any> {

  return function(state, action) {
    const isResetAction = action.type === ProjectActions.reset.type;
    return reducer(isResetAction ? undefined : state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [reset];
