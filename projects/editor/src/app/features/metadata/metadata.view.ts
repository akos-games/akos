import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'ak-metadata',
  templateUrl: './metadata.view.html',
  styleUrls: ['./metadata.view.scss']
})
export class MetadataView implements OnInit {

  metadata: FormGroup;

  constructor(fb: FormBuilder, private projectService: ProjectService) {

    let projectState = projectService.getState();

    this.metadata = fb.group({
      name: projectState.name,
      version: projectState.version
    });

    this.metadata.valueChanges.subscribe(metadata => this.onMetadataChange(metadata));
  }

  ngOnInit() {

    this.projectService.observeState(project => {

      if (project) {

        this.metadata.setValue({
          name: project.name,
          version: project.version
        }, {
          emitEvent: false
        });
      }
    });
}

  private onMetadataChange(metadata) {

    let projectState = this.projectService.getState();

    this.projectService.setState({
      ...projectState,
      name: metadata.name,
      version: metadata.version
    });
  }
}
