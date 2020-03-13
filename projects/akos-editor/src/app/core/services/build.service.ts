import { Injectable } from '@angular/core';
import { GameDescriptor, NativeService, NativeState } from 'akos-common';
import { ProjectState } from '../states/project.state';
import { ProjectService } from './project.service';
import { GameState } from '../states/game.state';
import { ScenesState } from '../states/scenes.state';

@Injectable()
export class BuildService {

  private engineDir: string;

  constructor(
    private nativeService: NativeService,
    private projectService: ProjectService,
    private nativeState: NativeState,
    private projectState: ProjectState
  ) {
    nativeState.getObservable().subscribe(nativeContext =>
      this.engineDir = nativeContext.serveDistDir ? `${nativeContext.serveDistDir}/build/akos-engine` : `${nativeContext.workingDir}/engine`
    );
  }

  async buildGame() {

    await this.projectService.saveProject();

    let distDir = this.projectState.get().distDir;

    this.nativeService.remove(distDir);
    this.nativeService.ensureDir(distDir);
    this.nativeService.copy(this.engineDir, distDir);

    this.buildDesktop('win');
    this.buildDesktop('mac');
    this.buildDesktop('linux');
  }

  private buildDesktop(platform: string) {

    let projectSate = this.projectState.get();
    let distDir = projectSate.distDir;

    if (this.nativeService.exists(`${distDir}/${platform}`)) {
      this.nativeService.copy(projectSate.file, `${distDir}/${platform}/game-descriptor.akg`);
      this.nativeService.copy(projectSate.assetsDir, `${distDir}/${platform}/assets`);
    }
  }
}
