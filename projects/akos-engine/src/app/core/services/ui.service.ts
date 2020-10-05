import { Injectable } from '@angular/core';
import { Confirm, UiState } from '../states/ui.state';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class UiService {

  constructor(private uiState: UiState) {
  }

  async confirm(confirm: Confirm = {}): Promise<boolean> {
    this.uiState.displayConfirm(confirm);
    return this.uiState.observeConfirm()
      .pipe(
        take(1),
        tap(() => this.uiState.displayConfirm(null))
      )
      .toPromise();
  }

  clearError() {
    this.uiState.setError(null);
  }

  error(error) {
    if (!this.uiState.get().error) {
      this.uiState.setError(error);
    }
  }
}
