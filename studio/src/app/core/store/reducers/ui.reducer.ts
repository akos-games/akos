import { Action, createReducer, on } from '@ngrx/store';
import { Ui } from '../../types/ui';
import { deepCopy } from '../../../shared/utils/object';
import { UiActions } from '../actions/ui.actions';
import { SceneActions } from '../actions/scene.actions';
import { UiHelper } from '../../helpers/ui.helper';

const initialState: Ui = {
  nodes: {
    metadata: UiHelper.getMetadataNode(),
    scenes: UiHelper.getScenesNode()
  },
  expandedNodes: {},
  openTabs: [],
  activeTabId: null
};

const reducer = createReducer(
  initialState,
  on(UiActions.closeTab, (state, {id}) => ({...deepCopy(state), openTabs: state.openTabs.filter(nodeId => nodeId !== id)})),
  on(UiActions.activateTab, (state, {id}) => ({...deepCopy(state), activeTabId: id})),
  on(UiActions.nodeSelected, (state, {id}) => {

    if (state.activeTabId === id && state.openTabs.includes(id)) {
      return state;
    }

    const newState = deepCopy(state);
    newState.activeTabId = id;

    if (!newState.openTabs.includes(id)) {
      newState.openTabs.push(id);
    }

    return newState;
  }),
  on(UiActions.toggleNodeExpanded, (state, {id}) => {

    const newSate = deepCopy(state);
    newSate.expandedNodes[id] = !newSate.expandedNodes[id];

    return newSate;
  }),
  on(SceneActions.addScene, (state, {scene}) => {

    const newState = deepCopy(state);
    const node = UiHelper.getNodeFromScene(scene);

    newState.nodes.scenes.children.push(node);
    newState.expandedNodes[newState.nodes.scenes.id] = true;
    newState.openTabs.push(node.id);
    newState.activeTabId = node.id;

    return newState;
  }),
  on(SceneActions.updateScene, (state, {scene}) => {

    const newState = deepCopy(state);
    let nodeIndex = newState.nodes.scenes.children.findIndex(node => node.id === scene.id.toString());

    if (scene.changes.name) {
      newState.nodes.scenes.children[nodeIndex].name = scene.changes.name;
    }

    return newState;
  }),
  on(SceneActions.deleteScene, (state, {id}) => {

    const newState = deepCopy(state);
    let nodeIndex = newState.nodes.scenes.children.findIndex(node => node.id === id.toString());
    let tabIndex = newState.openTabs.findIndex(tabId => tabId === id.toString());

    newState.nodes.scenes.children.splice(nodeIndex, 1);
    if (newState.nodes.scenes.children.length === 0) {
      newState.expandedNodes['scenes'] = false;
    }

    if (tabIndex >= 0) {
      newState.openTabs.splice(tabIndex, 1);
    }

    if (newState.activeTabId === id.toString() && newState.openTabs.length > 0) {
      newState.activeTabId = newState.openTabs[tabIndex > 0 ? tabIndex - 1 : 0];
    }

    return newState;
  })
);

export function uiReducer(state: Ui | undefined, action: Action) {
  return reducer(state, action);
}
