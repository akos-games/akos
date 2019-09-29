import {EntityState} from '@ngrx/entity';
import {Node} from './node';

export interface Ui {
  openNodes: EntityState<Node>,
  selectedNodeId: string
}
