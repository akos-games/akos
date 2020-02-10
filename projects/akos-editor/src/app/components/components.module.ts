import { NgModule } from '@angular/core';
import { AssetComponent } from './asset/asset.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
