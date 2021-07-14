import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiState } from '../../../core/states/ui.state';
import { map } from 'rxjs/operators';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'ak-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {

  message$ = this.uiState.observe().pipe(map(ui => ui.confirm?.message || 'Are you sure?'));
  yesText$ = this.uiState.observe().pipe(map(ui => ui.confirm?.yesText || 'Yes'));
  noText$ = this.uiState.observe().pipe(map(ui => ui.confirm?.noText || 'Cancel'));

  constructor(
    private uiService: UiService,
    private uiState: UiState
  ) {
  }

  ngOnInit() {
    this.uiService.bindHotkeys('confirm', {
      'esc': () => this.no(),
      'enter': () => this.yes()
    });
  }

  ngOnDestroy() {
    this.uiService.unbindHotkeys();
  }

  yes() {
    this.uiState.confirm(true);
  }

  no() {
    this.uiState.confirm(false);
  }
}
