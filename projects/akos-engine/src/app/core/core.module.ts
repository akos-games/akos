import { NgModule } from '@angular/core';
import { GameService } from './services/game.service';
import { AssetService } from './services/asset.service';
import { SceneService } from './services/scene.service';
import { GameDescriptorState } from './states/game-descriptor.state';
import { GameState } from './states/game.state';
import { ApplicationService } from './services/application.service';
import { NativeService, NativeState } from 'akos-common';
import { UiState } from './states/ui.state';
import { SettingsService } from './services/settings.service';
import { SettingsState } from './states/settings.state';

@NgModule({
  providers: [
    NativeState,
    GameDescriptorState,
    UiState,
    SettingsState,
    GameState,
    ApplicationService,
    NativeService,
    SettingsService,
    GameService,
    AssetService,
    SceneService
  ]
})
export class CoreModule {
}
