import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private dialog: MatDialog) {
  }

  handleError(error) {

    console.error(error);

    this.dialog.open(ErrorDialogComponent, {
      disableClose: true,
      data: error
    });
  }
}
