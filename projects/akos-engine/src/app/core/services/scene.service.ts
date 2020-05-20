import { Injectable } from '@angular/core';
import { Command, Scene } from 'akos-common';
import { GameDescriptorState } from '../states/game-descriptor.state';
import { GameState } from '../states/game.state';
import { Router } from '@angular/router';

@Injectable()
export class SceneService {

  private scene: Scene;

  constructor(
    private router: Router,
    private gameState: GameState,
    private gameDescriptorState: GameDescriptorState
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

      let game = this.gameState.get();
      game.scene.commandIndex++;
      this.gameState.set(game);

    } while (!command.parameters.waitForPlayer && !nextSceneId);

    if (nextSceneId) {
      this.startScene(nextSceneId);
    } else {
      this.gameState.applyChanges();
    }
  }

  startScene(sceneId: number) {

    let game = this.gameState.get();

    this.scene = this.gameDescriptorState.getScene(sceneId);
    game.scene = {
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
    this.gameState.set(game);
    this.nextCommand();
  }

  displayPicture(asset: string, fullscreen: boolean) {
    let game = this.gameState.get();
    game.scene.picture.asset = asset;
    game.scene.picture.fullscreen = fullscreen;
    this.gameState.set(game);
  }

  displayText(content: string) {
    let game = this.gameState.get();
    game.scene.text.content = content;
    game.scene.text.visible = true;
    this.gameState.set(game);
  }

  hideText() {
    let game = this.gameState.get();
    game.scene.text.visible = false;
    this.gameState.set(game);
  }
}
