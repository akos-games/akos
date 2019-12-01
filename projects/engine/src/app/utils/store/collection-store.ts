import { Store } from './store';
import { CollectionState } from './collection-state';
import { deepCopy } from '../object';
import { EventEmitter } from '@angular/core';

export class CollectionStore<T> extends Store<CollectionState<T>> {

  protected readonly idProperty = 'id';
  readonly items$: EventEmitter<T[]> = new EventEmitter<T[]>();

  constructor() {
    super();
  }

  protected getInitialState(): CollectionState<T> {
    return {items: {}, order: []};
  }

  protected notify() {
    super.notify();
    this.items$.emit(this.getItems());
  }

  addItems(...items: T[]) {

    let newState = this.getState();

    items.forEach(item => this.add(newState, item));
    this.updateState(newState);
  }

  removeItems(...items: T[]) {

    let newState = this.getState();

    items.forEach(item => this.remove(newState, item[this.idProperty]));
    this.updateState(newState);
  }

  removeById(itemId: string) {

    let newState = this.getState();

    this.remove(newState, itemId);
    this.updateState(newState);
  }

  sort(sortFn: (a: T, b: T) => number) {

    let newState = this.getState();
    let sortedItems = this.getItems().sort(sortFn);

    newState.order = sortedItems.map(item => item[this.idProperty]);
    this.updateState(newState);
  }

  getItem(itemId: string): T {
    return deepCopy(this.state.items[itemId]);
  }

  getItems(): T[] {
    return this.state.order.map(itemId => deepCopy(this.state.items[itemId]));
  }

  private add(state: CollectionState<T>, item: T) {
    state.items[item[this.idProperty]] = item;
    state.order.push(item[this.idProperty]);
  }

  private remove(state: CollectionState<T>, itemId: string) {

    if (!this.state[itemId]) {
      return;
    }

    let index = state.order.indexOf(itemId);

    state.order.splice(index, 1);
    delete state.items[itemId];
  }
}
