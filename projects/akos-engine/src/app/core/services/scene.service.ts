import { Injectable } from '@angular/core';
import { Command, NativeService, Scene } from 'akos-common';
import { GameDescriptorState } from '../states/game-descriptor.state';
import { GameState } from '../states/game.state';
import { Router } from '@angular/router';

@Injectable()
export class SceneService {

  private scene: Scene;

  constructor(
    private router: Router,
    private gameState: GameState,
    private gameDescriptorState: GameDescriptorState,
    private nativeService: NativeService
  ) {
  }

  nextCommand() {

    let command: Command;
    let nextSceneId = null;

    do {

      let commandIndex = this.gameState.get().scene.commandIndex;
      if (this.scene.commands.length <= commandIndex) {
        this.router.navigateByUrl('/main-menu');
        return;
      }

      command = this.scene.commands[commandIndex];
      switch (command.type) {

        case 'displayPicture':
          this.displayPicture(command.parameters.picture, command.parameters.fullscreen);
          break;

        case 'displayText':
          this.displayText(command.parameters.text);
          break;

        case 'hideText':
          this.hideText();
          break;

        case 'startScene':
          nextSceneId = command.parameters.sceneId;
          break;
      }

      let state = this.gameState.get();
      state.scene.commandIndex++;
      this.gameState.set(state);

    } while (!command.parameters.waitForPlayer && !nextSceneId);

    if (nextSceneId) {
      this.startScene(nextSceneId);
    } else {
      this.gameState.applyChanges();
    }
  }

  startScene(sceneId: number) {

    let state = this.gameState.get();

    this.scene = this.gameDescriptorState.getScene(sceneId);
    state.scene = {
      sceneId,
      commandIndex: 0,
      picture: {
        asset: null,
        fullscreen: null
      },
      text: {
        content: null,
        visible: false
      }
    };
    this.gameState.set(state);
    this.nextCommand();
  }

  displayPicture(asset: string, fullscreen: boolean) {
    let state = this.gameState.get();
    state.scene.picture.asset = asset;
    state.scene.picture.fullscreen = fullscreen;
    this.gameState.set(state);
  }

  displayText(content: string) {
    let state = this.gameState.get();
    state.scene.text.content = content;
    state.scene.text.visible = true;
    this.gameState.set(state);
  }

  hideText() {
    let state = this.gameState.get();
    state.scene.text.visible = false;
    this.gameState.set(state);
  }
}
