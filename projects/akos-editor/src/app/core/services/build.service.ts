import { Injectable } from '@angular/core';
import { NativeService } from './native.service';
import { GameDescriptor } from 'akos-common';

@Injectable()
export class BuildService {

  constructor(private nativeService: NativeService) {
  }

  async buildGame(gameDescriptor: GameDescriptor) {

    let engineDir = await this.nativeService.getEngineDir();
    let distDir = this.nativeService.getDistDir();

    await this.nativeService.remove(distDir);
    await this.nativeService.ensureDir(distDir);
    await this.nativeService.copy(engineDir, distDir);

    await this.buildDesktop('win', gameDescriptor);
    await this.buildDesktop('mac', gameDescriptor);
    await this.buildDesktop('linux', gameDescriptor);
  }

  private async buildDesktop(platform: string, gameDescriptor: GameDescriptor) {

    let distDir = this.nativeService.getDistDir();
    let assetsDir = this.nativeService.getAssetsDir();

    if (await this.nativeService.exists(`${distDir}/${platform}`)) {
      await this.nativeService.writeFile(`${distDir}/${platform}/game-descriptor.akg`, JSON.stringify(gameDescriptor));
      await this.nativeService.copy(assetsDir, `${distDir}/${platform}/assets`);
    }
  }
}
