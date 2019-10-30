import { CollectionStore } from '../../shared/utils/store/collection-store';
import { Scene } from '../types/scene';
import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class SceneStore extends CollectionStore<Scene> {
}
