import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './core/services/application.service';
import { UiState } from './core/states/ui.state';
import { map } from 'rxjs/operators';
import { ShortcutInput } from 'ng-keyboard-shortcuts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  shortcuts: ShortcutInput[] = [];

  displayConfirm$ = this.uiState.observe().pipe(map(ui => !!ui.confirm));
  displayLoadMenu$ = this.uiState.observe().pipe(map(ui => ui.displayLoadMenu));
  displaySaveMenu$ = this.uiState.observe().pipe(map(ui => ui.displaySaveMenu));
  displaySettings$ = this.uiState.observe().pipe(map(ui => ui.displaySettings));
  displayError$ = this.uiState.observeError();
  windowOpen$ = this.uiState.observeWindowOpen();

  constructor(
    private applicationService: ApplicationService,
    private uiState: UiState
  ) {
  }

  ngOnInit() {
    this.applicationService.start();

    this.shortcuts.push({
      key: 'alt + enter',
      command: () => {}
    })
  }
}
