import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatRippleModule,
  MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import { ToolbarContainer } from './containers/toolbar/toolbar.container';
import { SidebarContainer } from './containers/sidebar/sidebar.container';
import { NodeComponent } from './components/node/node.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeView } from './views/welcome/welcome.view';

@NgModule({
  declarations: [
    NodeComponent,
    SidebarContainer,
    ToolbarContainer,
    WelcomeView
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    MatToolbarModule,
    MatTreeModule
  ],
  exports: [
    SidebarContainer,
    ToolbarContainer
  ]
})
export class LayoutModule {
}
