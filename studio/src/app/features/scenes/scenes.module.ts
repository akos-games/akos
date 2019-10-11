import {NgModule} from '@angular/core';
import {SceneView} from './views/scene/scene.view';
import { MatCheckboxModule } from '@angular/material';


@NgModule({
  declarations: [
    SceneView
  ],
  imports: [
    MatCheckboxModule
  ],
  exports: [
    SceneView
  ]
})
export class ScenesModule {
}
