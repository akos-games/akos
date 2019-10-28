import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SceneView } from './scene/views/scene/scene.view';
import { MetadataView } from './core/views/metadata/metadata.view';

const routes: Routes = [
  {path: '', redirectTo: '/metadata', pathMatch: 'full'},
  {path: 'metadata', component: MetadataView},
  {path: 'scene/:id', component: SceneView}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
