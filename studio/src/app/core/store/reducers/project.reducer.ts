import {Action, createReducer, on} from '@ngrx/store';
import {Project} from '../../types/project';
import {deepCopy} from '../../../shared/utils/object';
import {ProjectActions} from '../actions/project.actions';

export const initialState: Project = {
  version: '0.1',
  file: null,
  metadata: {}
};

const reducer = createReducer(
  initialState,
  on(ProjectActions.loaded, (state, {applicationState}) => (applicationState.project))
);

export function projectReducer(state: Project | undefined, action: Action) {
  return reducer(state, action);
}
