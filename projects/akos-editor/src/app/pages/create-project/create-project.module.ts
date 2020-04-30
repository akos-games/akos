import { NgModule } from '@angular/core';
import { CreateProjectPage } from './create-project.page';
import { CreateProjectRoutingModule } from './create-project-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateProjectPage
  ],
  imports: [
    CommonModule,
    CreateProjectRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class CreateProjectModule {
}
