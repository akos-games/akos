import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { generateId } from '../../shared/utils/node';
import { SceneStore } from '../stores/scene.store';

@Injectable({
  providedIn: CoreModule
})
export class SceneService {

  constructor(private sceneStore: SceneStore) {
  }

  createScene() {

    this.sceneStore.addItems({
      id: generateId(),
      name: 'New scene'
    });
  }

  deleteScene(sceneId: number) {
    this.sceneStore.removeById(sceneId.toString());
  }
}
