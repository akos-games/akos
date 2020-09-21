import { Injectable } from '@angular/core';
import { UiState } from '../states/ui.state';

@Injectable()
export class SaveService {

  constructor(
    private uiState: UiState
  ) {
  }

  showSaveMenu() {
    this.uiState.displaySaveMenu(true);
  }

  hideSaveMenu() {
    this.uiState.displaySaveMenu(false);
  }

  showLoadMenu() {
    this.uiState.displayLoadMenu(true);
  }

  hideLoadMenu() {
    this.uiState.displayLoadMenu(false);
  }
}
