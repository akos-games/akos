import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'create-project',
    loadChildren: () => import('./pages/create-project/create-project.module').then(m => m.CreateProjectModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule)
  },
  {
    path: 'scene',
    loadChildren: () => import('./pages/scene/scene.module').then(m => m.SceneModule)
  },
  {
    path: 'theme',
    loadChildren: () => import('./pages/theme/theme.module').then(m => m.ThemeModule)
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
