import { NgModule } from '@angular/core';
import { ProjectService } from './services/project.service';
import { ScenesService } from './services/scenes.service';
import { BuildService } from './services/build.service';
import { NativeService } from 'akos-common';
import { GameService } from './services/game.service';

@NgModule({
  providers: [
    NativeService,
    ProjectService,
    BuildService,
    GameService,
    ScenesService
  ]
})
export class CoreModule {
}
