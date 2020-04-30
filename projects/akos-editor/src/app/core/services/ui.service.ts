import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiState } from '../states/ui.state';

@Injectable()
export class UiService {

  constructor(
    private matSnackBar: MatSnackBar,
    private uiState: UiState
  ) {
  }

  snackBar(message: string, action = 'OK', actionFn = () => {}) {
    this.matSnackBar.open(message, action, {
      verticalPosition: 'top'
    })
      .onAction()
      .subscribe(() => actionFn());
  }

  startLoading() {
    this.uiState.setLoading(true);
  }

  stopLoading() {
    this.uiState.setLoading(false);
  }
}
