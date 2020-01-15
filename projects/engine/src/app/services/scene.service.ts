import { Injectable } from '@angular/core';
import { GameDescriptorService } from './game-descriptor.service';
import { Scene } from 'akos-common/types/scene';
import { StatefulService } from 'akos-common/utils/services/stateful.service';

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

  constructor(private gameDescriptorService: GameDescriptorService) {
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
      // TODO end game
      return;
    }

    let command = this.currentScene.commands[state.commandIndex];
    if (command.type === 'log') {
      console.log('Command Log');
    }

    state.commandIndex++;

    this.setState(state);
  }

  startScene(sceneId: number) {

    this.currentScene = this.scenes[sceneId];

    this.currentScene.commands.forEach(command => {

      if (command.type === 'log') {
        console.log('Command Log');
      }
    });
  }
}
