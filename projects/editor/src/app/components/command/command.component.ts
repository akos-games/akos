import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Command } from 'akos-common/types/command';

@Component({
  selector: 'ak-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit, OnChanges {

  @Input() command: Command;

  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter<Command>();

  waitForPlayerTypes = ['displayText', 'hideText', 'displayPicture'];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.update.emit();
  }

  onDelete() {
    this.delete.emit(this.command);
  }

  isGreenHeader() {
    return ['displayText', 'hideText', 'displayPicture'].includes(this.command.type);
  }

  isRedHeader() {
    return ['startScene'].includes(this.command.type);
  }
}
