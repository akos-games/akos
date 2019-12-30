import { Injectable } from '@angular/core';
import { NativeService } from './native.service';
import { StatefulService } from 'akos-common/utils/services/stateful.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private nativeService: NativeService) {
  }

  getAssetUrl(relativePath: string) {
    return `file://${this.nativeService.getWorkingDirectory()}/assets/${relativePath}`;
  }
}
