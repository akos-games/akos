import { Injectable } from '@angular/core';
import { NativeService } from './native.service';

@Injectable()
export class AssetService {

  constructor(private nativeService: NativeService) {
  }

  getAssetUrl(relativePath: string) {
    return relativePath ? `file://${this.nativeService.getWorkingDir()}/assets/${relativePath}` : null;
  }
}
