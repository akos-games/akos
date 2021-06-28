import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundtrackPage } from './soundtrack.page';
import { SoundtrackRoutingModule } from './soundtrack-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TrackComponent } from './components/track/track.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    SoundtrackPage,
    TrackComponent
  ],
  imports: [
    SoundtrackRoutingModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    DragDropModule
  ]
})
export class SoundtrackModule {
}
