import { Injectable } from '@angular/core';
import { UiState } from '../states/ui.state';
import { Settings, SettingsState } from '../states/settings.state';
import { NativeService } from 'akos-common';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

@Injectable()
export class SettingsService {

  constructor(
    private nativeService: NativeService,
    private settingsState: SettingsState,
    private uiState: UiState,
    private hotkeysService: HotkeysService
  ) {
    this.hotkeysService.add(new Hotkey('alt+enter', () => {
      this.toggleFullscreen();
      return false;
    }));
  }

  async loadSettings() {
    this.setSettings({
      fullscreen: false
    });
  }

  async saveSettings(settings: Settings) {
    this.setSettings(settings);
  }

  showSettings() {
    this.uiState.displaySettings(true);
  }

  hideSettings() {
    this.uiState.displaySettings(false);
  }

  private setSettings(settings: Settings) {
    this.nativeService.setFullscreen(settings.fullscreen);
    this.settingsState.set(settings);
  }

  private toggleFullscreen() {
    let settings = this.settingsState.get();
    this.saveSettings({...settings, fullscreen: !settings.fullscreen});
  }
}
