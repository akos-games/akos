import { Scene } from '../types/scene';
import { Injectable } from '@angular/core';
import { CollectionStore } from 'akos-common/utils/store/collection-store';

@Injectable({
  providedIn: 'root'
})
export class SceneStore extends CollectionStore<Scene> {
}
