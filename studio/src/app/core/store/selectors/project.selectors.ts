import {createSelector} from '@ngrx/store';
import {ApplicationState} from '../../types/application-state';
import {Project} from '../../types/project';

const selectProject = (state: ApplicationState) => state.project;

export const getMetadata = createSelector(
  selectProject,
  (state: Project) => state.metadata
);
