import { Injectable } from '@angular/core';
import { GameDescriptorService } from './game-descriptor.service';
import { Scene } from 'akos-common/types/scene';
import { StatefulService } from 'akos-common/utils/services/stateful.service';
import { NativeService } from './native.service';

export interface SceneRun {
  sceneId: number;
  commandIndex: number;
  picture: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class SceneService extends StatefulService<SceneRun> {

  private scenes: {[id: string]: Scene} = {};
  private currentScene: Scene;

  constructor(private gameDescriptorService: GameDescriptorService, private nativeService: NativeService) {
    super();

    this.gameDescriptorService.observeState(state => {
      state.scenes.forEach(scene => this.scenes[scene.id] = scene);
      this.startScene(this.gameDescriptorService.getState().scenes[0].id);
    });
  }

  protected getInitialState(): SceneRun {
    return {
      sceneId: null,
      commandIndex: 0,
      picture: null,
      text: null
    };
  }

  nextCommand() {

    let state = this.getState();
    if (this.currentScene.commands.length <= state.commandIndex) {
      this.nativeService.exit();
    }

    let command = this.currentScene.commands[state.commandIndex];
    switch (command.type) {

      case 'log':
        console.log('Command Log');
        break;

      case 'displayPicture':
        break;

      case 'displayText':
        break;

      case 'startScene':
        break;
    }
    if (command.type === 'log') {
    }

    state.commandIndex++;

    this.setState(state);
  }

  startScene(sceneId: number) {
    this.currentScene = this.scenes[sceneId];
  }
}
