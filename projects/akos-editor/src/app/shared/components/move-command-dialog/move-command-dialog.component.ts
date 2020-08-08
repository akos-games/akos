import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ak-move-command-dialog',
  templateUrl: './move-command-dialog.component.html',
  styleUrls: ['./move-command-dialog.component.scss']
})
export class MoveCommandDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }
}
