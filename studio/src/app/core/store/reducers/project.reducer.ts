import {Action, createReducer, on} from '@ngrx/store';
import * as ProjectActions from '../actions/project.actions';
import {Project} from '../../types/project';
import {deepCopy} from '../../../shared/utils/object';

export const initialState: Project = {
  file: null,
  metadata: {}
};

const reducer = createReducer(
  initialState,
  on(ProjectActions.loaded, (state, {applicationState}) => (applicationState.project)),
  on(ProjectActions.create, () => deepCopy(initialState))
);

export function projectReducer(state: Project | undefined, action: Action) {
  return reducer(state, action);
}
