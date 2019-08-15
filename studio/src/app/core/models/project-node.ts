import {GameDescriptorNode} from './game-descriptor-node';

export interface ProjectNode {
  name: string;
  icon?: string;
  gameDescriptorNode?: GameDescriptorNode;
  createHandler?: Function;
  copyHandler?: Function;
  deleteHandler?: Function;
  parent?: ProjectNode,
  children?: ProjectNode[];
}
