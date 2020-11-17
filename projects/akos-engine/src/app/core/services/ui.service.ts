import { Injectable } from '@angular/core';
import { Confirm, UiState } from '../states/ui.state';
import { take, tap } from 'rxjs/operators';
import { GameState } from '../states/game.state';

@Injectable()
export class UiService {

  constructor(
    private gameState: GameState,
    private uiState: UiState
  ) {
  }

  async confirm(confirm: Confirm = {}): Promise<boolean> {
    this.uiState.displayConfirm(confirm);
    return this.uiState.observeConfirm()
      .pipe(
        take(1),
        tap(() => this.uiState.displayConfirm(null))
      )
      .toPromise();
  }

  async confirmQuitGame(): Promise<boolean> {

    if (this.gameState.get()?.sessionStart) {

      return this.confirm({
        message: 'Quit the current game?'
      });

    } else {
      return Promise.resolve(true);
    }
  }

  async confirmQuitApp(): Promise<boolean> {
    return this.confirm({
      message: 'Exit to desktop?'
    });
  }

  clearError() {
    this.uiState.setError(null);
  }

  error(error) {
    if (!this.uiState.get().error) {
      this.uiState.setError(error);
    }
  }
}
