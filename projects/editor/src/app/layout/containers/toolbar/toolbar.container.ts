import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { ProjectStore } from '../../../stores/project.store';
import { Project } from '../../../types/project';

@Component({
  selector: 'ak-toolbar',
  templateUrl: './toolbar.container.html',
  styleUrls: ['./toolbar.container.scss']
})
export class ToolbarContainer implements OnInit {

  project: Project;

  constructor(private projectService: ProjectService, private projectStore: ProjectStore) {
  }

  ngOnInit() {
    this.projectStore.state$.subscribe(project => this.project = project);
  }

  onCreate() {
    this.projectService.saveProject();
  }

  onOpen() {
    this.projectService.loadProject();
  }

  onSave() {
    this.projectService.saveProject();
  }

  onClose() {
    this.projectService.closeProject();
  }

  onBuildGame() {
    this.projectService.buildGame();
  }
}
