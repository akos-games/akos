export interface Node {
  id: string;
  name: string;
  icon?: string;
  children?: Node[];
  getCreateAction?: Function;
  getCopyAction?: Function;
  getDeleteAction?: Function;
}
