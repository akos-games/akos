import { NgModule } from '@angular/core';
import { NativeService } from './services/native.service';
import { FileService } from './services/file.service';
import { ProjectService } from './services/project.service';
import { SceneService } from './services/scene.service';
import { GameService } from './services/game.service';

@NgModule({
  providers: [
    NativeService,
    FileService,
    ProjectService,
    GameService,
    SceneService
  ]
})
export class CoreModule {
}
