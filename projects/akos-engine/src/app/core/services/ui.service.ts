import { Injectable } from '@angular/core';
import { Confirm, UiState } from '../states/ui.state';
import { take, tap } from 'rxjs/operators';
import { GameState } from '../states/game.state';
import hotkeys from 'hotkeys-js';

@Injectable()
export class UiService {

  private previousHotkeysScope = 'all';

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

  bindHotkeys(scope: string, keys: {[hotkey: string]: any}) {

    Object.keys(keys).forEach(key => {
      hotkeys(key, scope || 'all', event => {
        event.preventDefault();
        keys[key]();
      });
    });

    if (scope) {
      this.previousHotkeysScope = hotkeys.getScope();
      hotkeys.setScope(scope);
    }
  }

  unbindHotkeys() {

    const scope = hotkeys.getScope();

    if (scope !== 'all') {
      hotkeys.deleteScope(scope);
      hotkeys.setScope(this.previousHotkeysScope);
    }
  }
}
