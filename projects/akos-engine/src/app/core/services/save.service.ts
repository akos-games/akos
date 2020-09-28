import { Injectable } from '@angular/core';
import { UiState } from '../states/ui.state';
import { GameState } from '../states/game.state';
import { NativeService } from 'akos-common';
import { ApplicationService } from './application.service';

@Injectable()
export class SaveService {

  constructor(
    private gameState: GameState,
    private uiState: UiState,
    private applicationService: ApplicationService,
    private nativeService: NativeService
  ) {
  }

  async saveGame(saveId?: string) {

    let saveDir = `${this.applicationService.getGameDir()}/saves`;
    let saveFile = `${saveDir}/0.aks`;

    await this.nativeService.ensureDir(saveDir);
    await this.nativeService.writeFile(saveFile, JSON.stringify(this.gameState.get()));
  }

  showSaveMenu() {
    this.uiState.displaySaveMenu(true);
  }

  hideSaveMenu() {
    this.uiState.displaySaveMenu(false);
  }

  showLoadMenu() {
    this.uiState.displayLoadMenu(true);
  }

  hideLoadMenu() {
    this.uiState.displayLoadMenu(false);
  }
}
