import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'ak-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public error: Error,
    private uiService: UiService
  ) {
  }

  ngOnInit() {
  }

  onClose() {
    this.uiService.dequeueError();
    this.uiService.setErrorDialogOpen(false);
  }
}
