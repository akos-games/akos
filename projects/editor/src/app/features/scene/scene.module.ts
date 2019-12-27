import { NgModule } from '@angular/core';
import { SceneView } from './scene.view';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    SceneView
  ]
})
export class SceneModule {
}
