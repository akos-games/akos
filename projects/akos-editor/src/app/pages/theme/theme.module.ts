import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ThemePage } from './theme.page';
import { ThemeRoutingModule } from './theme-routing.module';

@NgModule({
  declarations: [
    ThemePage
  ],
  imports: [
    ThemeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ThemeModule {
}
