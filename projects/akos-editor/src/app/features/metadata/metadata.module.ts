import { NgModule } from '@angular/core';
import { MetadataView } from './metadata.view';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MetadataView
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule
  ]
})
export class MetadataModule {
}
