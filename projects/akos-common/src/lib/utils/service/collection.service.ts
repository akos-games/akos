import { StatefulService } from 'akos-common/utils/service/stateful.service';
import { EventEmitter } from '@angular/core';

export interface CollectionState<T> {
  items: {[id: string]: T};
  order: string[];
}

export class CollectionService<T> extends StatefulService<CollectionState<T>> {

  protected readonly collection$: EventEmitter<T[]>;
  protected readonly idProperty: string = 'id';

  protected getInitialState(): CollectionState<T> {
    return {items: {}, order: []};
  }

  protected emitState() {
    super.emitState();
    this.collection$.emit(this.getCollection());
  }

  protected add(item: T) {
    this.addAll([item]);
  }

  protected addAll(items: T[]) {

    let state = this.getState();
    items.forEach(item => {
      let itemId = item[this.idProperty];
      state.items[itemId] = item;
      state.order.push(itemId);
    });

    this.setState(state);
  }

  protected remove(id: string) {
    this.removeAll([id]);
  }

  protected removeAll(ids: string[]) {

    let state = this.getState();
    let deleteCount = 0;

    ids.forEach(id => {

      if (state.items[id] !== undefined) {
        delete state.items[id];
        state.order.splice(state.order.indexOf(id), 1);
        deleteCount++;
      }
    });

    this.setState(state, !!deleteCount);
  }

  protected sort(sortFn: (a: T, b: T) => number) {
    this.setCollection(this.getCollection().sort(sortFn));
  }

  protected setCollection(collection: T[]) {
    this.resetState(true);
    this.addAll(collection);
  }

  getCollection(): T[] {
    let state = this.getState();
    return state.order.map(id => state.items[id]);
  }

  observeCollection(observer: (collection: T[]) => void) {
    this.collection$.subscribe(observer);
  }
}
