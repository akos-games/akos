import {GameDescriptorNode} from './game-descriptor-node';

export interface ProjectNode {
  name: string;
  icon?: string;
  gameDescriptorNode?: GameDescriptorNode;
  createHandler?: Function;
  copyHandler?: Function;
  deleteHandler?: Function;
  component?: string;
  parent?: ProjectNode,
  children?: ProjectNode[];
}
