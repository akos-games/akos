import { EventEmitter } from '@angular/core';
import { deepCopy } from 'akos-common/utils/object';

export abstract class StatefulService<T> {

  protected state: T = this.getInitialState();
  protected readonly state$ = new EventEmitter<T>();

  protected abstract getInitialState(): T;

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
    this.state$.subscribe(state => observer(state));
  }
}
