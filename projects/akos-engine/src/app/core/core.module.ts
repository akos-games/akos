import { NgModule } from '@angular/core';
import { GameService } from './services/game.service';
import { AssetService } from './services/asset.service';
import { SceneService } from './services/scene.service';
import { GameDescriptorState } from './states/game-descriptor.state';
import { GameState } from './states/game.state';
import { ApplicationService } from './services/application.service';
import { NativeService, NativeState } from 'akos-common';

@NgModule({
  providers: [
    NativeState,
    GameDescriptorState,
    GameState,
    ApplicationService,
    NativeService,
    GameService,
    AssetService,
    SceneService
  ]
})
export class CoreModule {
}
