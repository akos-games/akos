import { NgModule } from '@angular/core';
import { MetadataView } from './metadata.view';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
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
