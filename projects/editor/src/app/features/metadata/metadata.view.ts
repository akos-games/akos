import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ak-metadata',
  templateUrl: './metadata.view.html',
  styleUrls: ['./metadata.view.scss']
})
export class MetadataView implements OnInit {

  @ViewChild('form', {static: true}) ngForm: NgForm;

  name: string;
  version: string;
  firstSceneId: number;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {

    this.projectService.observeState(project => {
      if (project) {
        this.name = project.name;
        this.version = project.version;
        this.firstSceneId = project.firstSceneId;
      }
    });

    this.ngForm.form.valueChanges.subscribe(metadata => this.projectService.setMetadata(metadata));
  }
}
