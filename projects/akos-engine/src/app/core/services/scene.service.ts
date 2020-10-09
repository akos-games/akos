import { Injectable } from '@angular/core';
import { Command, Scene } from 'akos-common';
import { GameDescriptorState } from '../states/game-descriptor.state';
import { GameState } from '../states/game.state';
import { Router } from '@angular/router';
import { GameService } from './game.service';

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
    let playerChoices = false;

    do {

      let jumpToIndex = null;
      let commandIndex = this.gameState.get().scene.commandIndex;
      if (this.scene.commands.length <= commandIndex) {
        this.router.navigateByUrl('/main-menu');
        this.gameState.reset();
        this.gameState.applyChanges();
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

        case 'jumpToCommand':
          jumpToIndex = this.findCommandIndex(command.parameters.toCommand);
          break;

        case 'playerChoice':
          this.displayChoices(command.parameters.choices);
          playerChoices = true;
          break;
      }

      let game = this.gameState.get();
      if (jumpToIndex) {
        game.scene.commandIndex = jumpToIndex;
      } else {
        game.scene.commandIndex++;
      }

      this.gameState.set(game);

    } while (!command.parameters.waitForPlayer && !playerChoices && !nextSceneId);

    if (nextSceneId) {
      this.startScene(nextSceneId);
    } else {
      this.gameState.applyChanges();
    }
  }

  startScene(sceneId: number) {

    let game = this.gameState.get();
    this.loadScene(sceneId);

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
      },
      playerChoices: null
    };

    this.gameState.set(game);
    this.nextCommand();
  }

  loadScene(sceneId: number) {
    this.scene = this.gameDescriptorState.getScene(sceneId);
  }

  selectChoice(choice) {

    let game = this.gameState.get();

    if (choice.toCommand) {
      game.scene.commandIndex = this.findCommandIndex(choice.toCommand);
    }

    game.scene.playerChoices = null;
    this.gameState.set(game)

    this.nextCommand();
  }

  private findCommandIndex(commandId: number): number {
    return this.scene.commands.findIndex(command => command.id === commandId);
  }

  private displayPicture(asset: string, fullscreen: boolean) {
    let game = this.gameState.get();
    game.scene.picture.asset = asset;
    game.scene.picture.fullscreen = fullscreen;
    this.gameState.set(game);
  }

  private displayText(content: string) {
    let game = this.gameState.get();
    game.scene.text.content = content;
    game.scene.text.visible = true;
    this.gameState.set(game);
  }

  private hideText() {
    let game = this.gameState.get();
    game.scene.text.visible = false;
    this.gameState.set(game);
  }

  private displayChoices(choices: any[]) {
    let game = this.gameState.get();
    game.scene.playerChoices = choices;
    this.gameState.set(game);
  }
}
