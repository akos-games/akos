import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SceneView } from './pages/scene/scene.view';
import { WelcomeView } from './layout/views/welcome/welcome.view';

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeView},
  {
    path: 'game',
    loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule)
  },
  {path: 'scene/:id', component: SceneView}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
