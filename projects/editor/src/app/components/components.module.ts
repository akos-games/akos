import { NgModule } from '@angular/core';
import { AssetComponent } from './asset/asset.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { CommandComponent } from './command/command.component';
import { FormsModule } from '@angular/forms';
import { ObjectComponent } from './object/object.component';

@NgModule({
  declarations: [
    AssetComponent,
    CommandComponent,
    ObjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    AssetComponent,
    CommandComponent,
    ObjectComponent
  ]
})
export class ComponentsModule {
}
