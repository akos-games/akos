import { Injectable } from '@angular/core';
import { Project } from '../types/project';
import { Store } from '../utils/store/store';

@Injectable({
  providedIn: 'root'
})
export class ProjectStore extends Store<Project> {

  protected getInitialState(): Project {

    return {
      name: 'New project',
      gameVersion: '',
      engineVersion: '0.1.0',
      file: null
    };
  }
}
