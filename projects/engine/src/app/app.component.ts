import { Component, OnInit } from '@angular/core';
import { GameDescriptorService } from './services/game-descriptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private gameDescriptorService: GameDescriptorService) {
  }

  ngOnInit() {
    this.gameDescriptorService.loadGameDescriptor();
  }
}
