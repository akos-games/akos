import { Component, OnInit } from '@angular/core';
import { UiState } from '../../../core/states/ui.state';
import { UiService } from '../../../core/services/ui.service';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'ak-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  error;

  constructor(
    private uiState: UiState,
    private uiService: UiService,
    private gameService: GameService
  ) {
  }

  ngOnInit() {
    this.error = this.uiState.get().error;
  }

  exitToMainMenu() {
    this.uiService.clearError();
    this.gameService.exitGame();
  }

  loadGame() {
    this.uiService.clearError();
  }
}
