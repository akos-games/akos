import { Component, Input, OnInit } from '@angular/core';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { SaveService } from '../../../core/services/save.service';
import { SaveState } from '../../../core/states/save.state';
import moment from 'moment';
import 'moment-duration-format';
import { UiState } from '../../../core/states/ui.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ak-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {

  @Input() mode: 'save' | 'load';

  shortcuts: ShortcutInput[] = [];

  saves$ = this.saveState.observe();
  displayConfirm$ = this.uiState.observe().pipe(map(ui => !!ui.confirm));

  constructor(
    private saveState: SaveState,
    private uiState: UiState,
    private saveService: SaveService
  ) {
  }

  ngOnInit() {

    this.shortcuts.push({
      key: 'esc',
      preventDefault: true,
      command: () => this.close()
    });
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
