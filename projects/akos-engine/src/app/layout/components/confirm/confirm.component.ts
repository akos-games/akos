import { Component, OnInit } from '@angular/core';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { UiState } from '../../../core/states/ui.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ak-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  shortcuts: ShortcutInput[] = [];

  message$ = this.uiState.observe().pipe(map(ui => ui.confirm?.message || 'Are you sure?'));
  yesText$ = this.uiState.observe().pipe(map(ui => ui.confirm?.yesText || 'Yes'));
  noText$ = this.uiState.observe().pipe(map(ui => ui.confirm?.noText || 'Cancel'));

  constructor(private uiState: UiState) {
  }

  ngOnInit() {

    this.shortcuts.push({
      key: 'esc',
      preventDefault: true,
      command: () => this.no()
    }, {
      key: 'enter',
      preventDefault: true,
      command: () => this.yes()
    });
  }

  yes() {
    this.uiState.confirm(true);
  }

  no() {
    this.uiState.confirm(false);
  }
}
