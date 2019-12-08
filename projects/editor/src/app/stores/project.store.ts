import { Injectable } from '@angular/core';
import { Project } from '../types/project';
import { Store } from 'akos-common/utils/store/store';

@Injectable({
  providedIn: 'root'
})
export class ProjectStore extends Store<Project> {

  protected getInitialState(): Project {
    return undefined;
  }
}
