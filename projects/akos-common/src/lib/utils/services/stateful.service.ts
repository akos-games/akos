import { deepCopy } from '../object';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class StatefulService<T> {

  protected state = new BehaviorSubject(this.getInitialState());

  getState(): T {
    return deepCopy(this.state.value);
  }

  getObservable(): Observable<T> {
    return this.state.asObservable();
  }

  protected setState(state: T) {
    this.state.next(deepCopy(state));
  }

  protected resetState() {
    this.setState(this.getInitialState());
  }

  protected getInitialState(): T {
    return undefined;
  }
}
