import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
  }

  onNew() {
    this.projectService.createProject();
  }

  onSave() {
    this.projectService.saveProject();
  }

  onSaveAs() {
    this.projectService.saveProjectAs();
  }
}
