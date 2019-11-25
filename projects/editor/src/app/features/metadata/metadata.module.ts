import { NgModule } from '@angular/core';
import { MetadataView } from './metadata.view';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MetadataView
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class MetadataModule {
}
