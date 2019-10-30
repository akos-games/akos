export interface TreeNode {
  id?: number;
  name: string;
  icon?: string;
  route?: string;
  children?: TreeNode[];
  createChild?(): string;
}
