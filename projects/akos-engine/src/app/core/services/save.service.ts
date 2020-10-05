import { Injectable } from '@angular/core';
import { UiState } from '../states/ui.state';
import { GameState } from '../states/game.state';
import { NativeService } from 'akos-common';
import { ApplicationService } from './application.service';
import { Save } from '../types/save';
import { SaveState } from '../states/save.state';
import moment from 'moment';
import { UiService } from './ui.service';

@Injectable()
export class SaveService {

  constructor(
    private gameState: GameState,
    private uiState: UiState,
    private saveState: SaveState,
    private applicationService: ApplicationService,
    private nativeService: NativeService,
    private uiService: UiService
  ) {
  }

  async createSave(saveId?: string) {

    if (saveId) {

      let confirm = await this.uiService.confirm({
        message: 'Overwrite this save?'
      });

      if (!confirm) {
        return;
      }
    }

    let saves = this.saveState.get();
    let lastId = Number(saves.length ? saves[saves.length - 1].id : '0');
    let game = this.gameState.get();

    let save: Save = {
      id: saveId ? saveId : (lastId + 1).toString(),
      date: new Date().getTime(),
      playTime: moment.duration(game.playTime).add(moment().diff(moment(game.sessionStart))).asMilliseconds(),
      game
    };

    let saveFile = `${this.applicationService.getSavesDir()}/${save.id}.aks`;
    let thumbFile = `${this.applicationService.getSavesDir()}/${save.id}.png`;
    let tempThumbFile = `${this.applicationService.getTempDir()}/thumb.png`;

    await this.nativeService.writeFile(saveFile, JSON.stringify(save));
    await this.nativeService.copy(tempThumbFile, thumbFile);

    await this.refreshSaveState();
  }

  async deleteSave(saveId: string) {

    let confirm = await this.uiService.confirm({
      message: 'Delete this save?'
    });

    if (!confirm) {
      return;
    }

    await this.nativeService.remove(`${this.applicationService.getSavesDir()}/${saveId}.aks`);
    await this.nativeService.remove(`${this.applicationService.getSavesDir()}/${saveId}.png`);
    await this.refreshSaveState();
  }

  async captureSaveThumb() {

    let img = await this.nativeService.takeScreenshot();
    let file = `${this.applicationService.getTempDir()}/thumb.png`

    await this.nativeService.writeFile(file, img.resize({height: 300}).toPNG());
  }

  async showSaveMenu() {
    await this.refreshSaveState();
    this.uiState.displaySaveMenu(true);
  }

  hideSaveMenu() {
    this.uiState.displaySaveMenu(false);
  }

  async showLoadMenu() {
    await this.refreshSaveState();
    this.uiState.displayLoadMenu(true);
  }

  hideLoadMenu() {
    this.uiState.displayLoadMenu(false);
  }

  getThumbUrl(saveId: string) {
    return `file://${this.applicationService.getSavesDir()}/${saveId}.png`;
  }

  private async refreshSaveState() {

    let files = await this.nativeService.readDir(this.applicationService.getSavesDir());
    let saves = await Promise.all(
      files
      .filter(file => file.endsWith('.aks'))
      .map(file => `${this.applicationService.getSavesDir()}/${file}`)
      .map(async file => JSON.parse(await this.nativeService.readFile(file)) as Save)
    );

    this.saveState.set(saves.sort((a, b) => Number(a.id) - Number(b.id)));
  }
}
