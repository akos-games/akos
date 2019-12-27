export interface Collection<T> {
  items: {[id: string]: T};
  order: string[];
}
