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

  cleanCommands() {

    const authorizedParameters = {
      displayPicture: ['waitForPlayer', 'picture'],
      displayText: ['waitForPlayer', 'text'],
      hideText: ['waitForPlayer']
    };

    let scenes = this.getEntities();

    scenes.forEach(scene => {
      scene.commands.forEach(command => {
        Object.keys(command.parameters).forEach(parameter => {
          authorizedParameters[command.type].includes(parameter) || delete command.parameters[parameter];
        })
      })
    });

    this.resetEntities(scenes);
  }
}
