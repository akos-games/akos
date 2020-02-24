import { Injectable } from '@angular/core';
import { GameDescriptorService } from './game-descriptor.service';
import { NativeService } from './native.service';
import { SceneRun } from '../types/scene-run';
import { Command, Scene, StatefulService } from 'akos-common';

@Injectable()
export class SceneService extends StatefulService<SceneRun> {

  private currentScene: Scene;

  constructor(private gameDescriptorService: GameDescriptorService, private nativeService: NativeService) {
    super();
  }

  startScene(sceneId: number) {
    this.currentScene = this.gameDescriptorService.getScene(sceneId);
    this.setState({...this.getInitialState(), sceneId});
    this.nextCommand();
  }

  nextCommand() {

    let command: Command;
    let nextSceneId = null;

    do {

      let sceneRun = this.getState();
      if (this.currentScene.commands.length <= sceneRun.commandIndex) {
        // TODO back to main menu
        this.nativeService.exit();
      }

      command = this.currentScene.commands[sceneRun.commandIndex];
      switch (command.type) {

        case 'displayPicture':
          sceneRun.picture = command.parameters.picture;
          sceneRun.fullscreen = command.parameters.fullscreen;
          break;

        case 'displayText':
          sceneRun.text = command.parameters.text;
          sceneRun.textVisible = true;
          break;

        case 'hideText':
          sceneRun.textVisible = false;
          break;

        case 'startScene':
          nextSceneId = command.parameters.sceneId;
          break;
      }

      sceneRun.commandIndex++;

      if (!nextSceneId) {
        this.setState(sceneRun);
      }

    } while (!command.parameters.waitForPlayer && !nextSceneId);

    if (nextSceneId) {
      this.startScene(nextSceneId);
    }
  }

  protected getInitialState(): SceneRun {
    return {
      sceneId: null,
      commandIndex: 0,
      picture: null,
      fullscreen: false,
      text: null,
      textVisible: false
    };
  }
}
