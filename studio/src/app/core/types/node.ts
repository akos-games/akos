export interface Node {
  id: string;
  name: string;
  icon?: string;
  route?: string;
  children?: Node[];
  getCreateAction?: Function;
  getCopyAction?: Function;
  getDeleteAction?: Function;
}
