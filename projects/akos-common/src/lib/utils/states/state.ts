import { BehaviorSubject, Observable } from 'rxjs';
import { deepCopy } from '../object';

export class State<T> {

  protected subject$ = new BehaviorSubject<T>(undefined);

  observe(): Observable<T> {
    return this.subject$.asObservable();
  }

  get(): T {
    return deepCopy(this.subject$.value);
  }

  set(value: T) {
    this.subject$.next(deepCopy(value));
  }
}
