import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { NativeService } from 'akos-common';
import { ProjectState } from '../states/project.state';
import { UiService } from './ui.service';

@Injectable()
export class ApplicationService {

  constructor(
    private projectService: ProjectService,
    private nativeService: NativeService,
    private uiService: UiService,
    private projectState: ProjectState
  ) {
  }

  async closeApp() {
    await this.projectService.saveProject();
    this.nativeService.exit();
  }

  async openDistDir() {

    if (this.projectState.get()) {

      let distDir = this.projectState.get().distDir;
      if (!await this.nativeService.exists(distDir)) {
        this.uiService.snackBar('Game has not been built yet');
      } else {
        this.nativeService.desktopOpen(distDir);
      }
    }
  }
}
