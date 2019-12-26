import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { ProjectStore } from '../../../stores/project.store';
import { Project } from '../../../types/project';
import { NativeService } from '../../../services/native.service';

@Component({
  selector: 'ak-toolbar',
  templateUrl: './toolbar.container.html',
  styleUrls: ['./toolbar.container.scss']
})
export class ToolbarContainer implements OnInit {

  project: Project;

  constructor(private projectService: ProjectService, private projectStore: ProjectStore, private nativeService: NativeService) {
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

  onQuit() {
    this.nativeService.exit();
  }

  onBuildGame() {
    this.projectService.buildGame();
  }
}
