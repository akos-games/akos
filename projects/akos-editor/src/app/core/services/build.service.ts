import { Injectable } from '@angular/core';
import { NativeService, NativeState } from 'akos-common';
import { ProjectState } from '../states/project.state';
import { ProjectService } from './project.service';
import { UiService } from './ui.service';

@Injectable()
export class BuildService {

  private engineDir: string;

  constructor(
    private nativeService: NativeService,
    private projectService: ProjectService,
    private uiService: UiService,
    private nativeState: NativeState,
    private projectState: ProjectState
  ) {
    nativeState.getObservable().subscribe(nativeContext =>
      this.engineDir = nativeContext.serveDistDir ? `${nativeContext.serveDistDir}/build/akos-engine` : `${nativeContext.workingDir}/engine`
    );
  }

  async buildGame() {

    this.uiService.startLoading();
    this.projectState.setBuilding(true);
    await this.projectService.saveProject();

    let distDir = this.projectState.get().distDir;

    await this.nativeService.remove(distDir);
    await this.nativeService.ensureDir(distDir);
    await this.nativeService.copy(this.engineDir, distDir);

    await this.buildDesktop('win');
    await this.buildDesktop('mac');
    await this.buildDesktop('linux');

    this.uiService.snackBar('Build success');
    this.projectState.setBuilding(false);
    this.uiService.stopLoading();
  }

  private async buildDesktop(platform: string) {

    let projectSate = this.projectState.get();
    let distDir = projectSate.distDir;

    if (await this.nativeService.exists(`${distDir}/${platform}`)) {
      await this.nativeService.copy(projectSate.file, `${distDir}/${platform}/game-descriptor.akg`);
      await this.nativeService.copy(projectSate.assetsDir, `${distDir}/${platform}/assets`);
    }
  }
}
