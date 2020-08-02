import { Component, OnInit } from '@angular/core';
import { UiState } from '../../../core/states/ui.state';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'ak-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  error;

  constructor(
    private uiState: UiState,
    private uiService: UiService
  ) {
  }

  ngOnInit() {
    console.log(this.uiState.get());
    this.error = this.uiState.get().error;
  }

  back() {

  }

  loadGame() {

  }
}
