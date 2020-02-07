import { Injectable } from '@angular/core';
import { StatefulService } from 'akos-common/utils/services/stateful.service';
import { GameDescriptor } from 'akos-common/types/game-descriptor';
import { NativeService } from './native.service';

@Injectable({
  providedIn: 'root'
})
export class GameDescriptorService extends StatefulService<GameDescriptor> {

  constructor(private nativeService: NativeService) {
    super();
    this.nativeService.observeState(state => this.loadGameDescriptor(state.workingDirectory));
  }

  protected getInitialState(): GameDescriptor {
    return undefined;
  }

  private async loadGameDescriptor(workingDirectory: string) {
    let file = `${workingDirectory}/game-descriptor.akg`;
    this.setState(JSON.parse(await this.nativeService.readFile(file)));
    this.nativeService.setWindowTitle(this.getState().name);
  }
}
