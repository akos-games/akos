import { EventEmitter } from '@angular/core';

export abstract class StatefulService<T> {

  protected state: T = this.getInitialState();
  protected readonly state$: EventEmitter<T> = new EventEmitter<T>();

  protected getInitialState(): T {
    return undefined;
  }

  protected emitState() {
    this.state$.emit(this.getState());
  }

  protected resetState(silent = false) {
    this.setState(this.getInitialState(), silent);
  }

  protected setState(state: T, silent = false) {
    this.state = deepCopy(state);
    if (!silent) {
      this.emitState();
    }
  }

  getState(): T {
    return deepCopy(this.state);
  }

  observeState(observer: (state: T) => void) {
    this.state$.subscribe(observer);
  }
}

function deepCopy<T>(value: T): T {
  return typeof value === 'object' ? JSON.parse(JSON.stringify(value)) : value;
}
