import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectGuard } from './core/guards/project.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/game',
    pathMatch: 'full'
  },
  {
    path: 'game',
    canActivate: [ProjectGuard],
    loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule)
  },
  {
    path: 'scene',
    canActivate: [ProjectGuard],
    loadChildren: () => import('./pages/scene/scene.module').then(m => m.SceneModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
