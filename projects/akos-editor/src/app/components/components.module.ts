import { NgModule } from '@angular/core';
import { AssetComponent } from './asset/asset.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { CommandComponent } from './command/command.component';
import { FormsModule } from '@angular/forms';
import { EntitySelectorComponent } from './entity-selector/entity-selector.component';

@NgModule({
  declarations: [
    AssetComponent,
    CommandComponent,
    EntitySelectorComponent
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
    EntitySelectorComponent
  ]
})
export class ComponentsModule {
}
