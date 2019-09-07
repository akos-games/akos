import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'project-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onNew() {
    // this.projectService.createProject();
  }

  onOpen() {
    // this.projectService.openProject();
  }

  onSave() {
    // this.projectService.saveProject();
  }

  onSaveAs() {
    // this.projectService.saveProjectAs();
  }
}
