import { Injectable } from '@angular/core';
import { UiState } from '../../core/states/ui.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable()
export class NotificationService {

  constructor(
    private uiState: UiState,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {

    this.uiState
      .observeError()
      .subscribe(error => this.error(error));

    this.uiState
      .observeNotification()
      .subscribe(notification => this.snackBar(notification.message, notification.actionText, notification.actionFn));
  }

  error(error) {

    if (this.matDialog.openDialogs.length === 0) {
      this.matDialog.open(ErrorDialogComponent, {
        disableClose: true,
        data: error
      });
    }
  }

  snackBar(message: string, actionText = 'OK', actionFn = () => {}) {

    this.matSnackBar
      .open(message, actionText, {
        verticalPosition: 'top'
      })
      .onAction()
      .subscribe(() => actionFn());
  }
}
