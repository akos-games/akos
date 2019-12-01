export interface CollectionState<T> {
  items: {[id: string]: T};
  order: string[];
}
