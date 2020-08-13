import { Injectable } from '@angular/core';
import { GameDescriptor, NativeService, NativeState } from 'akos-common';
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
    nativeState.observe().subscribe(nativeContext =>
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

    this.uiService.notify('Build success');
    this.projectState.setBuilding(false);
    this.uiService.stopLoading();
  }

  private async buildDesktop(platform: string) {

    let projectSate = this.projectState.get();
    let distDir = projectSate.distDir;
    let gameDescriptorFile = `${distDir}/${platform}/game-descriptor.akg`;

    if (await this.nativeService.exists(`${distDir}/${platform}`)) {
      await this.nativeService.copy(projectSate.file, gameDescriptorFile);
      await this.nativeService.copy(projectSate.assetsDir, `${distDir}/${platform}/assets`);
      await this.sanitizeGameDescriptor(gameDescriptorFile);
    }
  }

  private async sanitizeGameDescriptor(gameDescriptorFile: string) {

    let gameDescriptor: GameDescriptor = JSON.parse(await this.nativeService.readFile(gameDescriptorFile));

    gameDescriptor.scenes.forEach(scene => {
      delete scene.comments;
      scene.commands.forEach(command => {
        delete command.displayedSections;
        !command.reference && delete command.reference;
      });
    });

    await this.nativeService.writeFile(gameDescriptorFile, JSON.stringify(gameDescriptor));
  }
}
