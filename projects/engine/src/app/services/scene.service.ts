import { Injectable } from '@angular/core';
import { GameDescriptorService } from './game-descriptor.service';
import { Scene } from 'akos-common/types/scene';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  private scenes: {[id: string]: Scene} = {};
  private currentScene: Scene;

  constructor(private gameDescriptorService: GameDescriptorService) {

    console.log('scene service');

    this.gameDescriptorService.observeState(state => {
      state.scenes.forEach(scene => this.scenes[scene.id] = scene);
      this.startGame()
    });
  }

  startGame() {
    this.startScene(this.gameDescriptorService.getState().scenes[0].id);
  }

  startScene(sceneId: number) {

    console.log(sceneId);

    this.currentScene = this.scenes[sceneId];

    this.currentScene.commands.forEach(command => {

      if (command.type === 'log') {
        console.log('Command Log');
      }
    });
  }
}
