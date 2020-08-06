import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/services/settings.service';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { SettingsState } from '../../../core/states/settings.state';
import { takeUntil } from 'rxjs/operators';
import { ShortcutInput } from 'ng-keyboard-shortcuts';

@Component({
  selector: 'ak-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  shortcuts: ShortcutInput[] = [];
  settingsForm = this.fb.group({
    fullscreen: false
  });

  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private settingsState: SettingsState
  ) {
  }

  async ngOnInit() {

    this.shortcuts.push({
      key: 'esc',
      preventDefault: true,
      command: () => this.settingsService.hideSettings()
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
