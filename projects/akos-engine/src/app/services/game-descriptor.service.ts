import { Injectable } from '@angular/core';
import { NativeService } from './native.service';
import { GameDescriptor, StatefulService } from 'akos-common';

@Injectable({
  providedIn: 'root'
})
export class GameDescriptorService extends StatefulService<GameDescriptor> {

  constructor(private nativeService: NativeService) {
    super();
    this.nativeService.getObservable().subscribe(state => this.loadGameDescriptor(state.workingDirectory));
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
