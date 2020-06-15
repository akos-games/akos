import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { NativeService } from 'akos-common';
import { ProjectState } from '../../../core/states/project.state';
import { BuildService } from '../../../core/services/build.service';
import { UiState } from '../../../core/states/ui.state';
import { map } from 'rxjs/operators';
import { ApplicationService } from '../../../core/services/application.service';

@Component({
  selector: 'ak-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  project$ = this.projectState.getObservable();
  ui$ = this.uiState.getObservable();
  building$ = this.project$.pipe(map(project => project?.building));
  loading$ = this.ui$.pipe(map(ui => ui?.loading));

  constructor(
    private projectService: ProjectService,
    private buildService: BuildService,
    private applicationService: ApplicationService,
    private projectState: ProjectState,
    private uiState: UiState
  ) {
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

  onOpenDistDir() {
    this.applicationService.openDistDir();
  }

  onOpenDocumentation() {
    this.applicationService.openDocumentation();
  }

  onQuit() {
    this.applicationService.closeApp();
  }

  onBuildGame() {
    this.buildService.buildGame();
  }
}
