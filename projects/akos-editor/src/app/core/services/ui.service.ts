import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiState } from '../states/ui.state';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../layout/components/error-dialog/error-dialog.component';

@Injectable()
export class UiService {

  constructor(
    private uiState: UiState,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {
  }

  errorDialog(error: Error) {
    this.matDialog.open(ErrorDialogComponent, {
      disableClose: true,
      data: error
    });
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
