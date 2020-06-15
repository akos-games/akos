import { Component, OnDestroy, OnInit } from '@angular/core';
import { NativeService } from 'akos-common';
import { ProjectService } from '../../core/services/project.service';
import sanitize from 'sanitize-filename';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'page-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss']
})
export class CreateProjectPage implements OnInit, OnDestroy {

  projectFile = '';
  projectForm = this.fb.group({
    filename: new FormControl('', [Validators.required, this.filenameValidator()]),
    directory: new FormControl('', Validators.required, this.directoryAsyncValidator())
  })

  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private nativeService: NativeService,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.projectForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(values => this.projectFile = `${values.directory}/${values.filename}.akp`)
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async onSelectProjectDir() {
    let dir = await this.nativeService.showOpenDialog(null, {directory: true});
    if (dir) {
      this.projectForm.get('directory').setValue(dir);
    }
  }

  onCreate() {
    this.projectService.createProject(this.projectFile);
  }

  private filenameValidator() {
    return (control: FormControl) => control?.value !== sanitize(control?.value) ? {filename: true} : null;
  }

  private directoryAsyncValidator() {
    return (control: FormControl) => fromPromise(this.projectService.isAkosDir(control?.value))
      .pipe(map(isAkosDir => isAkosDir ? {directory: true} : null));
  }
}
