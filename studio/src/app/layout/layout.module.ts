import {NgModule} from '@angular/core';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {ContentComponent} from './components/content/content.component';
import {StructureComponent} from './components/structure/structure.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../shared/shared.module';
import {NodeComponent} from './components/structure/node/node.component';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    ContentComponent,
    StructureComponent,
    NodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    ToolbarComponent,
    ContentComponent,
    StructureComponent
  ]
})
export class LayoutModule {
}
