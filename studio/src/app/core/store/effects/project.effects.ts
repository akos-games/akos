import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FileService} from '../../services/file.service';
import * as ProjectActions from '../actions/project.actions';
import {mergeMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {Project} from '../../types/project';
import {from} from 'rxjs';

@Injectable()
export class ProjectEffects {

  // open$ = createEffect(() => this.actions.pipe(
  //   ofType(ProjectActions.load.type),
  //   mergeMap()
  //     .pipe())
  // ));

  constructor(private actions: Actions, private projectStore: Store<{project: Project}>, private fileService: FileService) {
  }
}
