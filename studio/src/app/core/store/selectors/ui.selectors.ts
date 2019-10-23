import {ApplicationState} from '../../types/application-state';
import {createSelector} from '@ngrx/store';
import { Node } from '../../types/node';

export const getNodes = (state: ApplicationState) => state.ui.nodes;
export const getExpandedNodeIds = (state: ApplicationState) => state.ui.expandedNodes;
export const getOpenTabIds = (state: ApplicationState) => state.ui.openTabs;
export const getActiveTabId = (state: ApplicationState) => state.ui.activeTabId;

export const getNodeStructure = createSelector(
  getNodes,
  (nodes: any) => [nodes.metadata, nodes.scenes]
);

export const getExpandedNodes = createSelector(
  getExpandedNodeIds,
  getNodes,
  (nodeIds: any, nodes: any) => Object.keys(nodeIds).map(nodeId => nodeIds[nodeId] && getNodeById(nodeId, nodes)).filter(node => !!node)
);

export const getOpenTabs = createSelector(
  getOpenTabIds,
  getNodes,
  (tabs: string[], nodes: any) => tabs.map(tabId => getNodeById(tabId, nodes))
);

export const getActiveTab = createSelector(
  getActiveTabId,
  getNodes,
  (tabId: string, nodes: any) => getNodeById(tabId, nodes)
);

function getNodeById(id: string, nodes: any): Node {

  const idIsEqual = node => node.id === id;

  return nodes[id]
    || nodes.scenes.children[nodes.scenes.children.findIndex(idIsEqual)];
}
