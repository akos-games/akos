import { Injectable } from '@angular/core';
import { GameDescriptorService } from './game-descriptor.service';
import { Scene } from 'akos-common/types/scene';
import { StatefulService } from 'akos-common/utils/services/stateful.service';
import { NativeService } from './native.service';
import { Command } from 'akos-common/types/command';
import { SceneRun } from '../types/scene-run';

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

    let command: Command;

    do {

      let state = this.getState();
      if (this.currentScene.commands.length <= state.commandIndex) {
        // TODO back to main menu
        this.nativeService.exit();
      }

      command = this.currentScene.commands[state.commandIndex];
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

      state.commandIndex++;
      this.setState(state);

    } while (!command.parameters.waitForUser);
  }

  startScene(sceneId: number) {
    this.currentScene = this.scenes[sceneId];
  }
}
