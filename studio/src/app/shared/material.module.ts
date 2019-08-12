import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatDividerModule,
  MatIconModule, MatMenuModule, MatRippleModule,
  MatSidenavModule,
  MatTabsModule, MatToolbarModule,
  MatTreeModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule
  ],
  exports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule
  ]
})
export class MaterialModule {
}
