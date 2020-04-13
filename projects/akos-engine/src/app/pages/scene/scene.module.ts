import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenePage } from './scene.page';
import { SceneRoutingModule } from './scene-routing.module';

@NgModule({
  declarations: [
    ScenePage
  ],
  imports: [
    CommonModule,
    SceneRoutingModule
  ]
})
export class SceneModule { }
