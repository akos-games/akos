export interface TreeNode {
  id?: number;
  name: string;
  icon?: string;
  children?: TreeNode[];
  createChild?();
  delete?();
  select?();
}
