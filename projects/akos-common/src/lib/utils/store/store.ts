import { deepCopy } from '../object';
import { EventEmitter } from '@angular/core';

export abstract class Store<T> {

  protected state: T;
  readonly state$: EventEmitter<T> = new EventEmitter<T>();

  protected constructor() {
    this.state = this.getInitialState();
  }

  protected abstract getInitialState(): T;

  protected notify() {
    this.state$.emit(this.getState());
  }

  getState(): T {
    return deepCopy(this.state);
  }

  updateState(state: T) {
    this.state = deepCopy(state);
    this.notify();
  }

  resetState() {
    this.state = this.getInitialState();
    this.notify();
  }
}
