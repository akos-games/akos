import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/main-menu', pathMatch: 'full'},
  {path: 'main-menu', loadChildren: () => import('./pages/main-menu/main-menu.module').then(m => m.MainMenuModule)},
  {path: 'scene', loadChildren: () => import('./pages/scene/scene.module').then(m => m.SceneModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
