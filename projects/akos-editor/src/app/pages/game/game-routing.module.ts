import { RouterModule, Routes } from '@angular/router';
import { GamePage } from './game.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', component: GamePage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {
}
