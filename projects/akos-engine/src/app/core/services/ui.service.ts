import { Injectable } from '@angular/core';
import { UiState } from '../states/ui.state';

@Injectable()
export class UiService {

  constructor(private uiState: UiState) {
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
