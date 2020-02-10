import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SceneModule } from './features/scene/scene.module';
import { MetadataModule } from './features/metadata/metadata.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    LayoutModule,
    MetadataModule,
    SceneModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
