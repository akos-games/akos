import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandComponent } from './components/command/command.component';
import { EntitySelectorComponent } from './components/entity-selector/entity-selector.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AssetSelectorComponent } from './components/asset-selector/asset-selector.component';

@NgModule({
  declarations: [
    AssetSelectorComponent,
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
    AssetSelectorComponent,
    CommandComponent,
    EntitySelectorComponent
  ]
})
export class SharedModule {
}
