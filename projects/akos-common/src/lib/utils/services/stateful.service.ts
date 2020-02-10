import { EventEmitter } from '@angular/core';
import { deepCopy } from '../object';

export abstract class StatefulService<T> {

  protected state: T = this.getInitialState();
  protected readonly state$ = new EventEmitter<T>();

  protected getInitialState(): T {
    return undefined;
  };

  protected emitState() {
    this.state$.emit(this.getState());
  }

  protected setState(state: T) {
    this.state = deepCopy(state);
    this.emitState();
  }

  protected resetState() {
    this.setState(this.getInitialState());
  }

  getState(): T {
    return deepCopy(this.state);
  }

  observeState(observer: (state: T) => void) {

    let state = this.getState();
    if (state !== undefined) {
      observer(this.getState());
    }

    return this.state$.subscribe(state => observer(state));
  }
}
