import { NgModule } from '@angular/core';
import { NativeService } from './services/native.service';
import { FileService } from './services/file.service';
import { ProjectService } from './services/project.service';
import { SceneService } from './services/scene.service';
import { ProjectGuard } from './guards/project.guard';

@NgModule({
  providers: [
    NativeService,
    FileService,
    ProjectService,
    SceneService,
    ProjectGuard
  ]
})
export class CoreModule {
}
