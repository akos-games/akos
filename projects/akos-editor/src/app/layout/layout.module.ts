import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
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
