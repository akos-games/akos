import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

@NgModule({
  declarations: [
    SettingsComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KeyboardShortcutsModule
  ],
  exports: [
    SettingsComponent,
    ErrorComponent
  ]
})
export class LayoutModule {
}
