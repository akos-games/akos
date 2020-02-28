import { Injectable } from '@angular/core';
import { NativeService } from './native.service';

@Injectable()
export class BuildService {

  constructor(private nativeService: NativeService, ) {
  }


}
