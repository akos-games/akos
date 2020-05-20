import { Injectable } from '@angular/core';
import { UiState } from '../states/ui.state';
import { Settings, SettingsState } from '../states/settings.state';
import { NativeService, NativeState } from 'akos-common';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

@Injectable()
export class SettingsService {

  constructor(
    private nativeService: NativeService,
    private nativeState: NativeState,
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

    let settingsFile = `${this.nativeState.get().appDataDir}/settings.json`;
    if (await this.nativeService.exists(settingsFile)) {
      this.setSettings(JSON.parse(await this.nativeService.readFile(settingsFile)));
    } else {
      await this.restoreDefaults();
    }
  }

  async saveSettings(settings: Settings) {

    this.setSettings(settings);

    let appDataDir = this.nativeState.get().appDataDir;
    await this.nativeService.ensureDir(appDataDir);
    await this.nativeService.writeFile(`${appDataDir}/settings.json`, JSON.stringify(settings, null, 2));
  }

  async restoreDefaults() {
    await this.saveSettings({
      fullscreen: true
    });
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
