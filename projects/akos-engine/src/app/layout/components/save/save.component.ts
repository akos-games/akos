import { Component, Input, OnInit } from '@angular/core';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { SaveService } from '../../../core/services/save.service';

@Component({
  selector: 'ak-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {

  @Input() mode: 'save' | 'load';

  shortcuts: ShortcutInput[] = [];

  constructor(
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

  close() {
    this.mode === 'save' && this.saveService.hideSaveMenu();
    this.mode === 'load' && this.saveService.hideLoadMenu();
  }
}
