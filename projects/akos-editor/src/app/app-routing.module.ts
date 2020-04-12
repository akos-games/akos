import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeView } from './layout/views/welcome/welcome.view';

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeView},
  {path: 'game', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule)},
  {path: 'scene', loadChildren: () => import('./pages/scene/scene.module').then(m => m.SceneModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
