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

    let id = '0';
    let saveFile = `${this.applicationService.getSavesDir()}/${id}.aks`;
    let thumbFile = `${this.applicationService.getSavesDir()}/${id}.png`;
    let tempThumbFile = `${this.applicationService.getTempDir()}/thumb.png`;

    await this.nativeService.writeFile(saveFile, JSON.stringify(this.gameState.get()));
    await this.nativeService.copy(tempThumbFile, thumbFile);
  }

  async captureSaveThumb() {

    let img = await this.nativeService.takeScreenshot();
    let file = `${this.applicationService.getTempDir()}/thumb.png`

    await this.nativeService.writeFile(file, img.resize({height: 300}).toPNG());
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
