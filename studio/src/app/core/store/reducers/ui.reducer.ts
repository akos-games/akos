import {Action, createReducer, on} from '@ngrx/store';
import * as UiActions from '../actions/ui.actions';
import {Ui} from '../../types/ui';
import {EntityAdapter} from '@ngrx/entity/src/models';
import {Node} from '../../types/node';
import {createEntityAdapter} from '@ngrx/entity';
import {deepCopy} from '../../../shared/utils/object';

const nodeAdapter: EntityAdapter<Node> = createEntityAdapter<Node>();

const initialState: Ui = {
  openNodes: nodeAdapter.getInitialState(),
  selectedNodeId: null
};

const reducer = createReducer(
  initialState,
  on(UiActions.openNode, (state, {node}) => ({
    ...deepCopy(state),
    openNodes: nodeAdapter.addOne(node, state.openNodes),
    selectedNodeId: node.id
  })),
  on(UiActions.closeNode, (state, {id}) => ({...deepCopy(state), openNodes: nodeAdapter.removeOne(id, state.openNodes)})),
  on(UiActions.selectNode, (state, {id}) => ({...deepCopy(state), selectedNodeId: id}))
);

export function uiReducer(state: Ui | undefined, action: Action) {
  return reducer(state, action);
}

const {selectAll} = nodeAdapter.getSelectors();

export const selectAllNodes = selectAll;
