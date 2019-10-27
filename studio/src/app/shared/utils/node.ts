import { deepCopy } from './object';

export function generateId(): number {
  return new Date().valueOf();
}

export function copyNode(node) {
  return {...deepCopy(node), id: generateId()};
}
