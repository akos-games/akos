import { ErrorHandler, NgModule } from '@angular/core';
import { ProjectService } from './services/project.service';
import { ScenesService } from './services/scenes.service';
import { BuildService } from './services/build.service';
import { NativeService, NativeState } from 'akos-common';
import { GameService } from './services/game.service';
import { ProjectState } from './states/project.state';
import { GameState } from './states/game.state';
import { ScenesState } from './states/scenes.state';
import { UiService } from './services/ui.service';
import { UiState } from './states/ui.state';
import { ApplicationService } from './services/application.service';
import { ThemeState } from './states/theme.state';
import { ThemeService } from './services/theme.service';
import { GlobalErrorHandler } from './global-error.handler';
import { Constants } from './constants';
import { SoundtrackState } from './states/soundtrack.state';
import { SoundtrackService } from './services/soundtrack.service';

@NgModule({
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    Constants,
    ApplicationService,
    NativeService,
    ProjectService,
    BuildService,
    UiService,
    GameService,
    ThemeService,
    ScenesService,
    SoundtrackService,
    NativeState,
    ProjectState,
    UiState,
    GameState,
    ThemeState,
    ScenesState,
    SoundtrackState
  ]
})
export class CoreModule {
}
