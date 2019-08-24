import { Component, OnInit } from '@angular/core';
import {GameDescriptorService} from '../../services/game-descriptor.service';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private projectService: ProjectService, private gameDescriptorService: GameDescriptorService) { }

  ngOnInit() {
  }

  onNew() {
    this.gameDescriptorService.createGameDescriptor();
  }

  onSave() {
    this.projectService.saveProject();
  }

  onSaveAs() {
    this.projectService.saveProjectAs();
  }
}
