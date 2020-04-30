import { Component, OnInit } from '@angular/core';
import { NativeService } from 'akos-common';
import { ProjectService } from '../../core/services/project.service';
import sanitize from 'sanitize-filename';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss']
})
export class CreateProjectPage implements OnInit {

  projectFile = '';

  projectForm = this.fb.group({
    filename: new FormControl('', [Validators.required, this.filenameValidator()]),
    directory: new FormControl('', [Validators.required, this.directoryValidator()])
  })

  constructor(
    private fb: FormBuilder,
    private nativeService: NativeService,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.projectForm.valueChanges
      .subscribe(values => this.projectFile = `${values.directory}/${values.filename}.akp`)
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

  private directoryValidator() {
    return (control: FormControl) => this.projectService.isAkosDir(control?.value) ? {directory: true} : null;
  }
}
