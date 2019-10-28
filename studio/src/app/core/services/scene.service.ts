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

    let id = generateId();
    this.sceneStore.addItems({
      id: id,
      name: 'New scene'
    });

    return id;
  }

  deleteScene(sceneId: number) {
    this.sceneStore.removeById(sceneId.toString());
  }
}
