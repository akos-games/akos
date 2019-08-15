import { Component, OnInit } from '@angular/core';
import {GameDescriptorService} from '../../services/game-descriptor.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private gameDescriptorService: GameDescriptorService) { }

  ngOnInit() {
  }

  onNew() {
    this.gameDescriptorService.createGameDescriptor();
  }
}
