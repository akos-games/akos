import { TreeNode } from './tree-node';
import { SceneService } from '../../services/scene.service';

export class ScenesNode implements TreeNode {

  name = 'Scenes';
  children = [];

  constructor(private sceneService: SceneService) {
  }

  createChild(): string {
    let id = this.sceneService.createEntity();
    return `scene/${id}`;
  }
}
