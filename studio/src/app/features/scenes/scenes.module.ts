import {NgModule} from '@angular/core';
import {SceneView} from './views/scene/scene.view';


@NgModule({
  declarations: [
    SceneView
  ],
  exports: [
    SceneView
  ]
})
export class ScenesModule {
}
