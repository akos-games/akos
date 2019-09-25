import {createAction} from '@ngrx/store';

export const openNode = createAction('[UI] Open Node');
export const closeNode = createAction('[UI] Close Node');
export const expandNode = createAction('[UI] Expand Node');
export const collapseNode = createAction('[UI] Collapse Node');
