import { TreeNode } from './tree-node';
import { ScenesService } from '../../core/services/scenes.service';

export class ScenesNode implements TreeNode {

  name = 'Scenes';
  children = [];

  constructor(private sceneService: ScenesService) {
  }

  createChild(): string {
    let id = this.sceneService.createScene().id;
    return `scene/${id}`;
  }
}
