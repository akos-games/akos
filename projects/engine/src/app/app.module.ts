import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScenePage } from './pages/scene/scene.page';
import { HotkeyModule } from 'angular2-hotkeys';

@NgModule({
  declarations: [
    AppComponent,
    ScenePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HotkeyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
