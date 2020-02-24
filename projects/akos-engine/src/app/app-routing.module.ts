import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScenePage } from './scene/scene.page';

const routes: Routes = [
  {path: '', redirectTo: '/scene', pathMatch: 'full'},
  {path: 'scene', component: ScenePage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
