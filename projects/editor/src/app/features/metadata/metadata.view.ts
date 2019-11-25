import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectStore } from '../../stores/project.store';

@Component({
  selector: 'ak-metadata',
  templateUrl: './metadata.view.html',
  styleUrls: ['./metadata.view.scss']
})
export class MetadataView implements OnInit {

  metadata: FormGroup;

  constructor(fb: FormBuilder, private projectStore: ProjectStore) {

    let projectState = projectStore.getState();

    this.metadata = fb.group({
      name: projectState.name,
      gameVersion: projectState.gameVersion,
      executableName: projectState.executableName
    });

    this.metadata.valueChanges.subscribe(metadata => this.onMetadataChange(metadata));
  }

  ngOnInit() {
  }

  private onMetadataChange(metadata) {

    let projectState = this.projectStore.getState();

    this.projectStore.updateState({
      ...projectState,
      name: metadata.name,
      gameVersion: metadata.gameVersion,
      executableName: metadata.executableName
    });
  }
}
