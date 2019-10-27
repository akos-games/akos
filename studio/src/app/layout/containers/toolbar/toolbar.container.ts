import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'ak-toolbar',
  templateUrl: './toolbar.container.html',
  styleUrls: ['./toolbar.container.css']
})
export class ToolbarContainer implements OnInit {

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
  }

  onNew() {
    this.projectService.resetProject();
  }

  onOpen() {
    this.projectService.loadProject();
  }

  onSave() {
    this.projectService.saveProject();
  }

  onSaveAs() {
    this.projectService.saveProject(true);
  }
}
