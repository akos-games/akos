import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/services/settings.service';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { SettingsState } from '../../../core/states/settings.state';
import { takeUntil } from 'rxjs/operators';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'ak-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  settingsForm = this.fb.group({
    fullscreen: false
  });

  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private settingsState: SettingsState,
    private uiService: UiService
  ) {
  }

  async ngOnInit() {

    this.uiService.bindHotkeys('settings', {
      'esc': () => this.settingsService.hideSettings()
    });

    this.settingsState
      .observe()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(settings => this.settingsForm.setValue(settings, {emitEvent: false}));

    this.settingsForm.valueChanges
      .subscribe(async settings => {
        await this.settingsService.saveSettings(settings);
      });
  }

  ngOnDestroy() {
    this.uiService.unbindHotkeys();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  back() {
    this.settingsService.hideSettings();
  }

  async restoreDefaults() {
    await this.settingsService.restoreDefaults();
  }
}
