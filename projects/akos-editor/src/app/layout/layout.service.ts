import { Injectable } from '@angular/core';
import { UiState } from '../core/states/ui.state';
import { filter, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { UiService } from '../core/services/ui.service';

@Injectable()
export class LayoutService {

  constructor(
    private uiState: UiState,
    private uiService: UiService,
    private matDialog: MatDialog
  ) {
    this.uiState.observe()
      .pipe(
        filter(ui => ui.errors.length > 0 && !ui.errorDialogOpen),
        map(ui => ui.errors[0])
      )
      .subscribe(error => {
        this.uiService.setErrorDialogOpen(true);
        this.matDialog.open(ErrorDialogComponent, {
          disableClose: true,
          data: error
        });
      });
  }
}
