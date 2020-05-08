import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainMenuPage } from './main-menu.page';

const routes: Routes = [
  {path: '', component: MainMenuPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainMenuRoutingModule {
}
