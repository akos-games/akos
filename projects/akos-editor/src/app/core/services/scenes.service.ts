import { Injectable } from '@angular/core';
import { generateId } from '../../shared/utils/node';
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

  resetScenes() {
    this.scenesState.set([]);
  }

  cleanCommands() {

    const authorizedParameters = {
      displayPicture: ['waitForPlayer', 'picture', 'fullscreen'],
      displayText: ['waitForPlayer', 'text'],
      hideText: ['waitForPlayer'],
      startScene: ['sceneId']
    };

    let scenes = this.scenesState.get();

    scenes.forEach(scene =>
      scene.commands.forEach(command =>
        Object.keys(command.parameters).forEach(parameter =>
          authorizedParameters[command.type].includes(parameter) || delete command.parameters[parameter]
        )
      )
    );

    this.scenesState.set(scenes);
  }
}
