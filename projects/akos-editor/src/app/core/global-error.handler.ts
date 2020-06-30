import { ErrorHandler, Injectable } from '@angular/core';
import { UiService } from './services/ui.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private uiService: UiService) {
  }

  handleError(error) {
    console.error(error);
    this.uiService.enqueueError(error);
  }
}
