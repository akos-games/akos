import {Node} from '../types/node';

export class NodeHelper {

  public static getMetadataNode(): Node {
    return {
      id: 'metadata',
      name: 'Game metadata',
      icon: 'list_alt'
    };
  }
}
