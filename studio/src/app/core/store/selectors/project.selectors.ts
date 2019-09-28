import {createSelector} from '@ngrx/store';
import {ApplicationState} from '../../types/application-state';
import {Project} from '../../types/project';

const selectProjectState = (state: ApplicationState) => state.project;

export const getMetadata = createSelector(
  selectProjectState,
  (state: Project) => state.metadata
);
