import {createSelector} from '@ngrx/store';
import {selectAllScenes} from '../reducers/scene.reducer';
import {ApplicationState} from '../../types/application-state';

const selectSceneState = (state: ApplicationState) => state.scenes;

export const getAllScenes = createSelector(
  selectSceneState,
  selectAllScenes
);
