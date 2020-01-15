import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotkeyModule } from 'angular2-hotkeys';
import { SceneModule } from './pages/scene/scene.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HotkeyModule.forRoot(),
    SceneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
