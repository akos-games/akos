import { Injectable } from '@angular/core';
import { NativeState } from 'akos-common';

@Injectable()
export class AssetService {

  constructor(private nativeState: NativeState) {
  }

  getAssetUrl(relativePath: string) {
    return relativePath ? `file://${this.nativeState.get().workingDir}/assets/${relativePath}` : null;
  }
}
