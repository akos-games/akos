import { Component, Input, OnInit } from '@angular/core';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { SaveService } from '../../../core/services/save.service';
import { SaveState } from '../../../core/states/save.state';

@Component({
  selector: 'ak-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {

  @Input() mode: 'save' | 'load';

  shortcuts: ShortcutInput[] = [];
  saves$ = this.saveState.observe();

  constructor(
    private saveState: SaveState,
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

  getSaveDate(timestamp) {
    return new Date(timestamp).toLocaleString('en-GB');
  }

  getThumbUrl(saveId) {
    return this.saveService.getThumbUrl(saveId);
  }
}
