import { Injectable } from '@angular/core';
import { ProjectStore } from '../stores/project.store';
import { CoreModule } from '../core.module';
import { generateId } from '../../shared/utils/node';
import { SceneStore } from '../stores/scene.store';

@Injectable({
  providedIn: CoreModule
})
export class ProjectService {

  constructor(
    private projectStore: ProjectStore,
    private sceneStore: SceneStore
  ) {}

  saveProject(changeCurrentLocation = false) {
    throw 'Not implemented';
  }

  loadProject() {
    throw 'Not implemented';
  }

  resetProject() {
    this.projectStore.resetState();
    this.sceneStore.resetState();
  }
}
