import { TreeNode } from './tree.node';

export class SceneNode implements TreeNode {

  id: number;
  name: string;
  icon = 'movie-open';
  route: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.route = `/scene/${id}`;
  }
}
