import { NgModule } from '@angular/core';
import { SceneView } from './scene.view';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ComponentsModule
  ],
  declarations: [
    SceneView
  ]
})
export class SceneModule {
}
