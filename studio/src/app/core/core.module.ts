import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {coreReducers} from './store';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forRoot(coreReducers)
  ]
})
export class CoreModule {
}
