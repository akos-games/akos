import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Scene} from '../../types/scene';
import {Action, createReducer, on} from '@ngrx/store';
import {SceneActions} from '../actions/scene.actions';

const adapter: EntityAdapter<Scene> = createEntityAdapter<Scene>();
const initialState: EntityState<Scene> = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(SceneActions.addScene, (state, {scene}) => adapter.addOne(scene, state)),
  on(SceneActions.updateScene, (state, {scene}) => adapter.updateOne(scene, state)),
  on(SceneActions.deleteScene, (state, {id}) => adapter.removeOne(id, state))
);

export function sceneReducer(state: EntityState<Scene> | undefined, action: Action) {
  return reducer(state, action);
}

const {selectAll} = adapter.getSelectors();

export const selectAllScenes = selectAll;
