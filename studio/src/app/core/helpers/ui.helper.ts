import { Node } from '../types/node';
import { SceneActions } from '../store/actions/scene.actions';
import { copyNode, generateId } from '../../shared/utils/node';
import { Scene } from '../types/scene';

export class UiHelper {

  public static getMetadataNode(): Node {
    return {
      id: 'metadata',
      name: 'Game metadata',
      icon: 'list_alt',
      route: 'metadata'
    };
  }

  public static getScenesNode(): Node {
    return {
      id: 'scenes',
      name: 'Scenes',
      children: [],
      getCreateAction: () => SceneActions.addScene({scene: {id: generateId(), name: 'New scene'}}),
    };
  }

  public static getNodeFromScene(scene: Scene) {
    return {
      id: scene.id.toString(),
      name: scene.name,
      icon: 'movie_creation',
      route: 'scene/' + scene.id,
      getCopyAction: () => SceneActions.addScene({scene: {...copyNode(scene), name: scene.name + ' copy'}}),
      getDeleteAction: () => SceneActions.deleteScene({id: scene.id})
    };
  }
}
