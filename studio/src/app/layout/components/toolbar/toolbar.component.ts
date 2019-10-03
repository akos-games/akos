import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Project} from '../../../core/types/project';
import { ProjectActions } from '../../../core/store/actions/project.actions';

@Component({
  selector: 'project-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private projectStore: Store<{project: Project}>) {
  }

  ngOnInit() {
  }

  onNew() {
    this.projectStore.dispatch(ProjectActions.reset());
  }

  onOpen() {
    this.projectStore.dispatch(ProjectActions.load());
  }

  onSave() {
    this.projectStore.dispatch(ProjectActions.save());
  }

  onSaveAs() {
    this.projectStore.dispatch(ProjectActions.saveAs());
  }
}
