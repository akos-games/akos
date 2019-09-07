import {NgModule} from '@angular/core';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {ContentComponent} from './content/content.component';
import {StructureComponent} from './structure/structure.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    ContentComponent,
    StructureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  exports: [
    ToolbarComponent,
    ContentComponent,
    StructureComponent
  ]
})
export class LayoutModule {
}
