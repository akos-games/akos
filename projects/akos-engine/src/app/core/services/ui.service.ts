import { Injectable } from '@angular/core';
import { UiState } from '../states/ui.state';

@Injectable()
export class UiService {

  constructor(private uiState: UiState) {
  }

  error(error) {
    this.uiState.setError(error);
  }
}
