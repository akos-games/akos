import { NgModule } from '@angular/core';
import { ScenePage } from './scene.page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../../shared/shared.module';
import { SceneRoutingModule } from './scene-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    ScenePage
  ],
  imports: [
    SceneRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    SharedModule
  ]
})
export class SceneModule {
}
