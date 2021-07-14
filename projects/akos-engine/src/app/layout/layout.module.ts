import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { SaveComponent } from './components/save/save.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [
    ErrorComponent,
    SaveComponent,
    SettingsComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ErrorComponent,
    SaveComponent,
    SettingsComponent,
    ConfirmComponent
  ]
})
export class LayoutModule {
}
