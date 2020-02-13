import { Injectable } from '@angular/core';
import { GameDescriptorService } from './game-descriptor.service';
import { NativeService } from './native.service';
import { SceneRun } from '../types/scene-run';
import { Command, Scene, StatefulService } from 'akos-common';

@Injectable({
  providedIn: 'root'
})
export class SceneService extends StatefulService<SceneRun> {

  private scenes: {[id: string]: Scene} = {};
  private currentScene: Scene;

  constructor(private gameDescriptorService: GameDescriptorService, private nativeService: NativeService) {
    super();

    this.gameDescriptorService.getObservable().subscribe(state => {
      state.scenes.forEach(scene => this.scenes[scene.id] = scene);
      this.startScene(this.gameDescriptorService.getState().scenes[0].id);
    });
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

  startScene(sceneId: number) {

    let sceneRun = this.getInitialState();
    sceneRun.sceneId = sceneId;
    this.setState(sceneRun);

    this.currentScene = this.scenes[sceneId];
    this.nextCommand();
  }
}
