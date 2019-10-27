import { EventEmitter, Injectable } from '@angular/core';
import { Project } from '../types/project';
import { CoreModule } from '../core.module';
import { Store } from '../../shared/utils/store/store';

@Injectable({
  providedIn: CoreModule
})
export class ProjectStore extends Store<Project> {

  protected getInitialState(): Project {

    return {
      name: 'New project',
      gameVersion: '',
      akosVersion: '0.1.0',
      file: null
    };
  }
}
