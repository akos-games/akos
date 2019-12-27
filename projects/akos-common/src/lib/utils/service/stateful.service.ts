import { EventEmitter } from '@angular/core';

export abstract class StatefulService<T> {

  protected state: T = this.getInitialState();
  protected readonly state$ = new EventEmitter<T>();

  protected getInitialState(): T {
    return undefined;
  }

  protected emitState() {
    this.state$.emit(this.getState());
  }

  getState(): T {
    return deepCopy(this.state);
  }

  setState(state: T, silent = false) {
    this.state = deepCopy(state);
    if (!silent) {
      this.emitState();
    }
  }

  resetState(silent = false) {
    this.setState(this.getInitialState(), silent);
  }

  observeState(observer: (state: T) => void) {
    this.state$.subscribe(observer);
  }
}

function deepCopy<T>(value: T): T {
  return typeof value === 'object' ? JSON.parse(JSON.stringify(value)) : value;
}
