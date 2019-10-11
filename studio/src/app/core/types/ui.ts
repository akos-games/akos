import { Node } from './node';

export interface Ui {
  nodes: {
    metadata: Node;
    scenes: Node;
  };
  expandedNodes: {[id: string]: boolean};
  openTabs: string[];
  activeTabId: string;
}
