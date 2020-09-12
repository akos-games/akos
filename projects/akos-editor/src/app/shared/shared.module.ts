import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandComponent } from './components/command/command.component';
import { EntitySelectorComponent } from './components/entity-selector/entity-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AssetSelectorComponent } from './components/asset-selector/asset-selector.component';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MoveCommandDialogComponent } from './components/move-command-dialog/move-command-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AssetSelectorComponent,
    CommandComponent,
    EntitySelectorComponent,
    MoveCommandDialogComponent,
    ConfirmDeleteDialogComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatDialogModule,
        DragDropModule
    ],
  exports: [
    AssetSelectorComponent,
    CommandComponent,
    EntitySelectorComponent
  ]
})
export class SharedModule {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('assets/mdi.svg'));
  }
}
