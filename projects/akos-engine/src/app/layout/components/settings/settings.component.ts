import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/services/settings.service';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { SettingsState } from '../../../core/states/settings.state';
import { filter, takeUntil } from 'rxjs/operators';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

@Component({
  selector: 'ak-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  settingsForm = this.fb.group({
    fullscreen: false
  });

  private silent = false;
  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private settingsState: SettingsState,
    private hotkeysService: HotkeysService
  ) {
    this.hotkeysService.add(new Hotkey('esc', () => {
      this.settingsService.hideSettings();
      return false;
    }));
  }

  async ngOnInit() {

    this.settingsState
      .getObservable()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(() => !this.silent)
      )
      .subscribe(settings => this.settingsForm.setValue(settings));

    this.settingsForm.valueChanges
      .subscribe(settings => {
        this.silent = true;
        this.settingsService.saveSettings(settings);
        this.silent = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  back() {
    this.settingsService.hideSettings();
  }
}
