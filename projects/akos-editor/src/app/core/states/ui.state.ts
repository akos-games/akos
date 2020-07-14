import { State } from 'akos-common';
import { Ui } from '../types/ui';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../types/notification';

@Injectable()
export class UiState extends State<Ui> {

  private notificationSubject$ = new Subject<Notification>();
  private errorSubject$ = new Subject();

  constructor() {
    super();
    this.subject$.next({
      loading: false
    });
  }

  notify(message: string);
  notify(notification: Notification);
  notify(notification) {
    this.notificationSubject$.next(typeof notification === 'string' ? {message: notification} : notification);
  }

  observeError(): Observable<any> {
    return this.errorSubject$.asObservable();
  }

  observeNotification(): Observable<Notification> {
    return this.notificationSubject$.asObservable();
  }

  setError(error) {
    this.errorSubject$.next(error);
  }

  setNotification(notification: Notification) {
    this.notificationSubject$.next(notification);
  }

  setLoading(loading: boolean) {
    this.set({...this.subject$.value, loading});
  }
}
