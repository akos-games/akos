import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { SaveComponent } from './components/save/save.component';

@NgModule({
  declarations: [
    ErrorComponent,
    SaveComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KeyboardShortcutsModule
  ],
  exports: [
    ErrorComponent,
    SaveComponent,
    SettingsComponent
  ]
})
export class LayoutModule {
}
