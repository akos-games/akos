import { NgModule } from '@angular/core';
import { AssetComponent } from './asset/asset.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { CommandComponent } from './command/command.component';

@NgModule({
  declarations: [
    AssetComponent,
    CommandComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    AssetComponent,
    CommandComponent
  ]
})
export class ComponentsModule {
}
