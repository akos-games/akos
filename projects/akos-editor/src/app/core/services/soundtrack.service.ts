import { Injectable } from '@angular/core';
import { SoundtrackState } from '../states/soundtrack.state';
import { Track } from 'akos-common';
import { generateId } from '../../shared/utils/entity.util';

@Injectable()
export class SoundtrackService {

  constructor(private soundtrackState: SoundtrackState) {
  }

  createTrack(): Track {

    let track: Track = {
      id: generateId(),
      name: 'New track',
      file: null
    }

    this.soundtrackState.add(track);
    return track;
  }

  updateTrack(track: Track) {
    this.soundtrackState.add(track);
  }

  deleteTrack(id: number) {
    this.soundtrackState.remove(id);
  }

  resetSoundtrack() {
    this.soundtrackState.set([]);
  }
}
