import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SceneView} from './features/scenes/views/scene/scene.view';

const routes: Routes = [
  {path: 'scene/:id', component: SceneView}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
