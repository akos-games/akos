import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SoundtrackPage } from './soundtrack.page';

const routes: Routes = [
  {path: '', component: SoundtrackPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoundtrackRoutingModule {
}
