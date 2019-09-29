import {ApplicationState} from '../../types/application-state';
import {createSelector} from '@ngrx/store';
import {selectAllNodes} from '../reducers/ui.reducer';

const selectUiState = (state: ApplicationState) => state.ui;
const selectOpenNodesState = (state: ApplicationState) => state.ui.openNodes;

export const getAllOpenNodes = createSelector(
  selectOpenNodesState,
  selectAllNodes
);

export const getSelectedNode = createSelector(
  selectUiState,
  (state) => state.openNodes.entities[state.selectedNodeId]
);
