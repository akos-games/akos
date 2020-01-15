import { Injectable } from '@angular/core';
import { NativeService } from './native.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private nativeService: NativeService) {
  }

  getAssetUrl(relativePath: string) {
    return relativePath ? `file://${this.nativeService.getWorkingDirectory()}/assets/${relativePath}` : null;
  }
}
