import { Injectable } from '@angular/core';
import { deepCopy, GameDescriptor, Scene, State } from 'akos-common';

interface GameDescriptorIndex {
  scenes: {[id: number]: Scene}
}

@Injectable()
export class GameDescriptorState extends State<GameDescriptor> {

  private index: GameDescriptorIndex = {
    scenes: {}
  };

  set(gameDescriptor) {
    this.indexGameDescriptor(deepCopy(gameDescriptor));
    super.set(gameDescriptor);
  }

  getScene(id: number) {
    return deepCopy(this.index.scenes[id]);
  }

  private indexGameDescriptor(gameDescriptor: GameDescriptor) {
    gameDescriptor.scenes.forEach(scene => this.index.scenes[scene.id] = scene);
  }
}
