import { Injectable } from '@angular/core';
import { UiState } from '../states/ui.state';
import { Notification } from '../types/notification';

@Injectable()
export class UiService {

  constructor(
    private uiState: UiState
  ) {
  }

  error(error) {
    this.uiState.setError(error);
  }

  notify(message: string);
  notify(notification: Notification);
  notify(notification) {
    this.uiState.setNotification(typeof notification === 'string' ? {message: notification} : notification);
  }

  startLoading() {
    this.uiState.setLoading(true);
  }

  stopLoading() {
    this.uiState.setLoading(false);
  }
}
