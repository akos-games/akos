import { Injectable } from '@angular/core';
import { generateId } from '../../shared/utils/entity.util';
import { Scene } from 'akos-common';
import { ScenesState } from '../states/scenes.state';

@Injectable()
export class ScenesService {

  constructor(private scenesState: ScenesState) {
  }

  createScene(): Scene {

    let scene = {
      id: generateId(),
      name: 'New scene',
      commands: []
    };

    this.scenesState.add(scene);
    return scene;
  }

  updateScene(scene: Scene) {
    this.scenesState.add(scene);
  }

  deleteScene(id: number) {
    this.scenesState.remove(id);
  }

  resetScenes() {
    this.scenesState.set([]);
  }
}
