import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SceneModule } from './pages/scene/scene.module';
import { CoreModule } from './core/core.module';
import { GameModule } from './pages/game/game.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    CoreModule,
    LayoutModule,
    SceneModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
