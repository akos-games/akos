import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiState } from '../states/ui.state';

@Injectable()
export class UiService {

  constructor(
    private uiState: UiState,
    private matSnackBar: MatSnackBar
  ) {
  }

  enqueueError(error: Error) {
    this.uiState.setErrors([...this.uiState.get().errors, {message: error.message, stack: error.stack}]);
  }

  dequeueError() {
    this.uiState.setErrors(this.uiState.get().errors.splice(1));
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

  setErrorDialogOpen(open: boolean) {
    this.uiState.setErrorDialogOpen(open);
  }
}
