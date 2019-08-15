export interface ProjectNode {
  uid?: number;
  name: string;
  icon?: string;
  addAction?: string;
  deleteAction?: string;
  copyAction?: string;
  children?: ProjectNode[];
}
