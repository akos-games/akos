import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataView } from './features/metadata/metadata.view';
import { SceneView } from './features/scene/scene.view';

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
