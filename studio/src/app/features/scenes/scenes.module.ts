import {NgModule} from '@angular/core';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {scenesReducers} from './store';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    StoreModule.forFeature('scenes', scenesReducers)
  ]
})
export class ScenesModule {
}
