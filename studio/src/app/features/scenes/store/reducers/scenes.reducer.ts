import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Scene} from '../../../../core/types/scene';
import {Action, createReducer, on} from '@ngrx/store';
import * as ScenesActions from '../actions/scenes.actions';
import {generateId, copyNode} from '../../../../shared/utils/node';

export const adapter: EntityAdapter<Scene> = createEntityAdapter();

export const initialState: EntityState<Scene> = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(ScenesActions.addScene, (state, {scene}) => adapter.addOne({...scene, id: generateId()}, state)),
  on(ScenesActions.updateScene, (state, {scene}) => adapter.updateOne(scene, state)),
  on(ScenesActions.copyScene, (state, {id}) => adapter.addOne(copyNode(state.entities[id]), state)),
  on(ScenesActions.deleteScene, (state, {id}) => adapter.removeOne(id, state))
);

export function scenesReducer(state: EntityState<Scene> | undefined, action: Action) {
  return reducer(state, action);
}
