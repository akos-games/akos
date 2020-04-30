import { NgModule } from '@angular/core';
import { ProjectService } from './services/project.service';
import { ScenesService } from './services/scenes.service';
import { BuildService } from './services/build.service';
import { NativeService, NativeState } from 'akos-common';
import { GameService } from './services/game.service';
import { ProjectState } from './states/project.state';
import { GameState } from './states/game.state';
import { ScenesState } from './states/scenes.state';
import { UiService } from './services/ui.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UiState } from './states/ui.state';

@NgModule({
  imports: [
    MatSnackBarModule
  ],
  providers: [
    NativeService,
    ProjectService,
    BuildService,
    UiService,
    GameService,
    ScenesService,
    NativeState,
    ProjectState,
    UiState,
    GameState,
    ScenesState
  ]
})
export class CoreModule {
}
