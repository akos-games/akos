import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuPage } from './main-menu.page';
import { MainMenuRoutingModule } from './main-menu-routing.module';

@NgModule({
  declarations: [
    MainMenuPage
  ],
  imports: [
    CommonModule,
    MainMenuRoutingModule
  ]
})
export class MainMenuModule {
}
