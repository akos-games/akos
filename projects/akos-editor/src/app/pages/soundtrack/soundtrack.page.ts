import { Component, OnInit } from '@angular/core';
import { SoundtrackState } from '../../core/states/soundtrack.state';
import { SoundtrackService } from '../../core/services/soundtrack.service';
import { Track } from 'akos-common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'page-soundtrack',
  templateUrl: './soundtrack.page.html',
  styleUrls: ['./soundtrack.page.scss']
})
export class SoundtrackPage implements OnInit {

  tracks$ = this.soundtrackState.observe();

  constructor(
    private soundtrackState: SoundtrackState,
    private soundtrackService: SoundtrackService
  ) {
  }

  ngOnInit() {
  }

  onAddTrack() {
    this.soundtrackService.createTrack();
  }

  onUpdateTrack(track: Track) {
    this.soundtrackService.updateTrack(track);
  }

  onDeleteTrack(track: Track) {
    this.soundtrackService.deleteTrack(track.id);
  }

  onDropTrack(event: CdkDragDrop<any>) {
    let tracks = this.soundtrackState.get();
    moveItemInArray(tracks, event.previousIndex, event.currentIndex);
    this.soundtrackState.set(tracks);
  }
}
