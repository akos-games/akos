import { Component, Input, OnInit } from '@angular/core';
import { Command } from 'akos-common/types/command';

@Component({
  selector: 'ak-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  @Input() command: Command = {id: 0, type: 'startScene'};

  constructor() {
  }

  ngOnInit() {
  }
}
