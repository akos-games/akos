import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/types/project';
import { NativeService } from 'akos-common';
import { ProjectState } from '../../../core/states/project.state';
import { BuildService } from '../../../core/services/build.service';
import { UiState } from '../../../core/states/ui.state';
import { Observable } from 'rxjs';
import { Ui } from '../../../core/types/ui';

@Component({
  selector: 'ak-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  project: Observable<Project>;
  ui: Observable<Ui>;

  constructor(
    private projectService: ProjectService,
    private buildService: BuildService,
    private nativeService: NativeService,
    private projectState: ProjectState,
    private uiState: UiState
  ) {
    this.project = projectState.getObservable();
    this.ui = this.uiState.getObservable();
  }

  ngOnInit() {
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
