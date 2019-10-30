import { Injectable } from '@angular/core';
import { ProjectStore } from '../stores/project.store';
import { CoreModule } from '../core.module';
import { SceneStore } from '../stores/scene.store';
import { FileService } from './file.service';

@Injectable({
  providedIn: CoreModule
})
export class ProjectService {

  private static readonly PROJECT_FILTER = {name: 'Akos Project', extensions: ['akp']};

  constructor(
    private fileService: FileService,
    private projectStore: ProjectStore,
    private sceneStore: SceneStore
  ) {}

  async saveProject(changeCurrentLocation = false) {

    let state = this.projectStore.getState();

    if (!state.file || changeCurrentLocation) {
      state.file = await this.fileService.selectNewFile([ProjectService.PROJECT_FILTER]);
      this.projectStore.updateState(state);
    }

    await this.fileService.writeFile(state.file, JSON.stringify({
      project: state,
      scenes: this.sceneStore.getState()
    }));
  }

  async loadProject() {

    let file = await this.fileService.selectExistingFile([ProjectService.PROJECT_FILTER]);
    let data = JSON.parse(await this.fileService.readFile(file));
    
    this.projectStore.updateState({...data.project, file: file});
    this.sceneStore.updateState(data.scenes);
  }

  resetProject() {
    this.projectStore.resetState();
    this.sceneStore.resetState();
  }
}
