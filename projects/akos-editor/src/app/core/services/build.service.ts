import { Injectable } from '@angular/core';
import { NativeService } from './native.service';
import { GameDescriptor } from 'akos-common';

@Injectable()
export class BuildService {

  constructor(private nativeService: NativeService) {
  }

  async buildGame(gameDescriptor: GameDescriptor) {

    let engineDir = await this.nativeService.getEngineDir();
    let projectDir = this.nativeService.getState().projectDir;
    let distDir = `${projectDir}/dist`;
    let assetsDir = `${projectDir}/assets`;

    await this.nativeService.remove(distDir);
    await this.nativeService.ensureDir(distDir);
    await this.nativeService.copy(engineDir, distDir);

    if (await this.nativeService.exists(`${distDir}/win`)) {
      await this.nativeService.writeFile(`${distDir}/win/game-descriptor.akg`, JSON.stringify(gameDescriptor));
      await this.nativeService.copy(assetsDir, `${distDir}/win/assets`);
    }

    if (await this.nativeService.exists(`${distDir}/mac`)) {
      await this.nativeService.writeFile(`${distDir}/mac/game-descriptor.akg`, JSON.stringify(gameDescriptor));
      await this.nativeService.copy(assetsDir, `${distDir}/mac/assets`);
    }

    if (await this.nativeService.exists(`${distDir}/linux`)) {
      await this.nativeService.writeFile(`${distDir}/linux/game-descriptor.akg`, JSON.stringify(gameDescriptor));
      await this.nativeService.copy(assetsDir, `${distDir}/linux/assets`);
    }
  }
}
