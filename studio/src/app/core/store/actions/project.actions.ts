import {createAction, props} from '@ngrx/store';
import {ApplicationState} from '../../types/application-state';

export const create = createAction('[Project] Create');
export const load = createAction('[Project] Load');
export const loaded = createAction('[Project] Loaded', props<{applicationState: ApplicationState}>());
export const save = createAction('[Project] Save');
export const saveAs = createAction('[Project] Save As');
