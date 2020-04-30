import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/types/project';
import { NativeService } from 'akos-common';
import { ProjectState } from '../../../core/states/project.state';
import { BuildService } from '../../../core/services/build.service';
import { UiState } from '../../../core/states/ui.state';

@Component({
  selector: 'ak-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  project: Project;
  loading = false;

  constructor(
    private projectService: ProjectService,
    private buildService: BuildService,
    private nativeService: NativeService,
    private projectState: ProjectState,
    private uiState: UiState
  ) {
  }

  ngOnInit() {
    this.projectState.getObservable().subscribe(project => this.project = project);
    this.uiState.getObservable().subscribe(ui => this.loading = ui.loading);
  }

  onCreate() {
    this.projectService.createProject();
  }

  onOpen() {
    this.projectService.loadProject();
  }

  onClose() {
    this.projectService.closeProject();
  }

  onQuit() {
    this.nativeService.exit();
  }

  onBuildGame() {
    this.buildService.buildGame();
  }
}
