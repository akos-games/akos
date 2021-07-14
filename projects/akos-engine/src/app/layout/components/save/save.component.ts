import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SaveService } from '../../../core/services/save.service';
import { SaveState } from '../../../core/states/save.state';
import moment from 'moment';
import 'moment-duration-format';
import { UiState } from '../../../core/states/ui.state';
import { map } from 'rxjs/operators';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'ak-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit, OnDestroy {

  @Input() mode: 'save' | 'load';

  saves$ = this.saveState.observe();
  displayConfirm$ = this.uiState.observe().pipe(map(ui => !!ui.confirm));

  constructor(
    private saveService: SaveService,
    private saveState: SaveState,
    private uiService: UiService,
    private uiState: UiState
  ) {
  }

  ngOnInit() {
    this.uiService.bindHotkeys('save', {
      'esc': () => this.close()
    });
  }

  ngOnDestroy() {
    this.uiService.unbindHotkeys()
  }

  onSaveClick(saveId) {
    this.mode === 'save' && this.saveGame(saveId);
    this.mode === 'load' && this.saveService.loadSave(saveId);
  }

  async saveGame(saveId?) {
    await this.saveService.createSave(saveId);
  }

  async deleteSave(saveId) {
    await this.saveService.deleteSave(saveId);
  }

  close() {
    this.mode === 'save' && this.saveService.hideSaveMenu();
    this.mode === 'load' && this.saveService.hideLoadMenu();
  }

  formatSaveDate(timestamp) {
    return new Date(timestamp).toLocaleString('en-GB');
  }

  formatPlayTime(duration) {
    return moment.duration(duration, 'ms').format('hh:mm:ss', {trim: false});
  }

  getThumbUrl(saveId) {
    return this.saveService.getThumbUrl(saveId);
  }

  isVisible(saveId) {
    return this.mode === 'load' || saveId !== 'autosave' && saveId !== 'quicksave';
  }
}
