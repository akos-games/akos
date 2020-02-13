import { Injectable } from '@angular/core';
import { generateId } from '../utils/node';
import { EntityService, Scene } from 'akos-common';

@Injectable({
  providedIn: 'root'
})
export class SceneService extends EntityService<Scene> {

  createScene(): Scene {

    let scene = {
      id: generateId(),
      name: 'New scene',
      commands: []
    };

    this.addToState(scene);
    return scene;
  }

  updateScene(scene: Scene) {
    this.addToState(scene);
  }

  resetScenes(scenes: Scene[] = []) {
    this.setState(scenes);
  }

  getScene(id: number): Scene {
    return this.getFromState(id);
  }

  cleanCommands() {

    const authorizedParameters = {
      displayPicture: ['waitForPlayer', 'picture', 'fullscreen'],
      displayText: ['waitForPlayer', 'text'],
      hideText: ['waitForPlayer'],
      startScene: ['sceneId']
    };

    let scenes = this.getState();

    scenes.forEach(scene => {
      scene.commands.forEach(command => {
        Object.keys(command.parameters).forEach(parameter => {
          authorizedParameters[command.type].includes(parameter) || delete command.parameters[parameter];
        })
      })
    });

    this.setState(scenes);
  }
}
