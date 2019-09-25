import {Action} from '@ngrx/store';

export interface Node {
  id: string;
  name: string;
  icon?: string;
  createAction?: Action;
  copyAction?: Action;
  deleteAction?: Action;
  children?: Node[];
}
