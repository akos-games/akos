import { Injectable } from '@angular/core';
import { SceneStore } from '../stores/scene.store';
import { generateId } from '../utils/node';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  constructor(private sceneStore: SceneStore) {
  }

  createScene(): number {

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
