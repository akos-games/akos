import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../core/services/project.service';
import { NgForm } from '@angular/forms';
import { Project } from '../core/types/project';

@Component({
  selector: 'ak-metadata',
  templateUrl: './metadata.view.html',
  styleUrls: ['./metadata.view.scss']
})
export class MetadataView implements OnInit {

  @ViewChild('form', {static: true}) ngForm: NgForm;

  project: Project;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.getObservable().subscribe(project => this.project = project);
    this.ngForm.form.valueChanges.subscribe(metadata => {this.projectService.setMetadata(metadata); console.log(metadata)});
  }
}
