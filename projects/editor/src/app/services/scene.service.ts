import { Injectable } from '@angular/core';
import { generateId } from '../utils/node';
import { Scene } from 'akos-common/types/scene';
import { EntityService } from 'akos-common/utils/services/entity.service';

@Injectable({
  providedIn: 'root'
})
export class SceneService extends EntityService<Scene> {

  protected getNewEntity(): Scene {
    return {
      id: generateId(),
      name: 'New scene',
      commands: []
    };
  }
}
