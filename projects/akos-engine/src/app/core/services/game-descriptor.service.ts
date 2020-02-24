import { Injectable } from '@angular/core';
import { NativeService } from './native.service';
import { GameDescriptor, Scene, StatefulService } from 'akos-common';
import { filter } from 'rxjs/operators';

interface GameDescriptorIndex {
  scenes: {[id: number]: Scene}
}

@Injectable()
export class GameDescriptorService extends StatefulService<GameDescriptor> {

  private index: GameDescriptorIndex = {
    scenes: {}
  };

  constructor(private nativeService: NativeService) {
    super();
    this.nativeService.getObservable()
      .pipe(filter(nativeContext => !!nativeContext?.workingDirectory))
      .subscribe(() => this.loadGameDescriptor());
  }

  getScene(id: number) {
    return this.index.scenes[id];
  }

  private async loadGameDescriptor() {

    let file = `${this.nativeService.getWorkingDir()}/game-descriptor.akg`;
    let gameDescriptor = JSON.parse(await this.nativeService.readFile(file));

    this.nativeService.setWindowTitle(gameDescriptor.game.name);
    this.indexContent(gameDescriptor);
    this.setState(gameDescriptor);
  }

  private indexContent(gameDescriptor: GameDescriptor) {
    gameDescriptor.scenes.forEach(scene => this.index.scenes[scene.id] = scene);
  }
}
