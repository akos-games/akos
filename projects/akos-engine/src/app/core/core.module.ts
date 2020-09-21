import { ErrorHandler, NgModule } from '@angular/core';
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
import { GlobalErrorHandler } from './global-error.handler';
import { UiService } from './services/ui.service';
import { SaveService } from './services/save.service';

@NgModule({
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    NativeState,
    GameDescriptorState,
    UiState,
    SettingsState,
    GameState,
    ApplicationService,
    NativeService,
    SettingsService,
    UiService,
    GameService,
    AssetService,
    SceneService,
    SaveService
  ]
})
export class CoreModule {
}
