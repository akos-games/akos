import { State } from 'akos-common';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Ui {
  displaySettings: boolean;
  error: any;
}

@Injectable()
export class UiState extends State<Ui> {

  constructor() {
    super();
    this.subject$.next({
      displaySettings: false,
      error: null
    });
  }

  displaySettings(visibility: boolean) {
    this.set({...this.get(), displaySettings: visibility});
  }

  observeError(): Observable<any> {
    return this.subject$.pipe(map(ui => ui.error));
  }

  observeWindowOpen(): Observable<boolean> {
    return combineLatest([
      this.subject$,
      this.observeError()
    ])
      .pipe(map(([ui, error]) => ui.displaySettings || !!error))
  }

  setError(error) {
    this.set({...this.get(), error: error ? {message: error.message, stack: error.stack} : null});
  }
}
