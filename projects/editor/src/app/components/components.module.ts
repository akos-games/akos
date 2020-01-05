import { NgModule } from '@angular/core';
import { AssetComponent } from './asset/asset.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { CommandComponent } from './command/command.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AssetComponent,
    CommandComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
