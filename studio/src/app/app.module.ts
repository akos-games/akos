import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {ScenesModule} from './features/scenes/scenes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    LayoutModule,
    SharedModule,
    ScenesModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
