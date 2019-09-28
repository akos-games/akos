import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    LayoutModule,
    SharedModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
