import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { coreReducers } from './store';
import { SharedModule } from '../shared/shared.module';
import { metaReducers } from './store/meta-reducers';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forRoot(coreReducers, {metaReducers})
  ]
})
export class CoreModule {
}
