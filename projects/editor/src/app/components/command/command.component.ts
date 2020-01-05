import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Command } from 'akos-common/types/command';

@Component({
  selector: 'ak-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  @Input() command: Command;
  @Output() delete = new EventEmitter<Command>();

  constructor() {
  }

  ngOnInit() {
  }

  onDelete() {
    this.delete.emit(this.command);
  }
}
