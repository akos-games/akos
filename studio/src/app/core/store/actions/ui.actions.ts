import { createAction, props } from '@ngrx/store';

export const UiActions = {
  closeTab: createAction('[UI] Close Tab', props<{id: string}>()),
  activateTab: createAction('[UI] Activate Tab', props<{id: string}>()),
  nodeSelected: createAction('[UI] Node Selected', props<{id: string}>()),
  toggleNodeExpanded: createAction('[UI] Expand Node', props<{id: string}>())
};
