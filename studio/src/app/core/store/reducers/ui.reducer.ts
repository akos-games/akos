import {Action, createReducer, on} from '@ngrx/store';
import * as UiActions from '../actions/ui.actions';
import {Ui} from '../../types/ui';

export const initialState: Ui = {
  expandedNodes: []
};

const reducer = createReducer(
  initialState,
  // on(UiActions.expandNode, (state, {id}) => {...state, ex})
);

export function uiReducer(state: Ui | undefined, action: Action) {
  return reducer(state, action);
}
