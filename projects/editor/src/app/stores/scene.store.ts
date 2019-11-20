import { Scene } from '../types/scene';
import { Injectable } from '@angular/core';
import { CollectionStore } from '../utils/store/collection-store';

@Injectable({
  providedIn: 'root'
})
export class SceneStore extends CollectionStore<Scene> {
}
