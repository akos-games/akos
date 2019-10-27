import { TreeNode } from './tree-node';
import { generateId } from '../../shared/utils/node';
import { SceneService } from '../../core/services/scene.service';

export class SceneNode implements TreeNode {

  id: number;
  name: string;
  icon = 'movie_creation';

  constructor(id: number, name: string, private sceneService: SceneService) {
    this.id = id;
    this.name = name;
  }

  select() {
  }

  delete() {
    this.sceneService.deleteScene(this.id);
  }
}
