import { NgModule } from '@angular/core';
import { WelcomePage } from './welcome.page';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    WelcomePage
  ],
  imports: [
    WelcomeRoutingModule,
    MatButtonModule
  ]
})
export class WelcomeModule {
}
