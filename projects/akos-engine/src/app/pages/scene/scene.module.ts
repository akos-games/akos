import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenePage } from './scene.page';
import { SceneRoutingModule } from './scene-routing.module';
import { PauseMenuComponent } from './components/pause-menu/pause-menu.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

@NgModule({
  declarations: [
    ScenePage,
    PauseMenuComponent
  ],
  imports: [
    CommonModule,
    SceneRoutingModule,
    KeyboardShortcutsModule
  ]
})
export class SceneModule {
}
