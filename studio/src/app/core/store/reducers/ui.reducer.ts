import {Project} from '../../types/project';
import {Action, createReducer, on} from '@ngrx/store';
import * as UiActions from '../actions/ui.actions';
import {Ui} from '../../types/ui';

export const initialState: Ui = {
};

const reducer = createReducer(
  initialState
);

export function uiReducer(state: Ui | undefined, action: Action) {
  return reducer(state, action);
}
