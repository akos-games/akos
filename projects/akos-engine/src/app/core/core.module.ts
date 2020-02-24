import { NgModule } from '@angular/core';
import { GameService } from './services/game.service';
import { NativeService } from './services/native.service';
import { GameDescriptorService } from './services/game-descriptor.service';
import { AssetService } from './services/asset.service';
import { SceneService } from './services/scene.service';

@NgModule({
  providers: [
    NativeService,
    GameDescriptorService,
    GameService,
    AssetService,
    SceneService
  ]
})
export class CoreModule {

  // TODO remove when main menu implemented
  constructor(private gameService: GameService) {
  }
}
