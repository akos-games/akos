import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScenePage } from './scene.page';

const routes: Routes = [
  {path: ':id', component: ScenePage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SceneRoutingModule {
}
