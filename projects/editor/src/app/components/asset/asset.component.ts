import { Component, Input, OnInit } from '@angular/core';
import { FileFilter } from 'electron';
import { FileService } from '../../services/file.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'ak-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

  @Input() file: string;
  @Input() label: string;
  @Input() fileFilter: FileFilter;

  private assetsPath: string;

  constructor(private projectService: ProjectService, private fileService: FileService) {
  }

  ngOnInit() {
    this.assetsPath = this.projectService.getState().paths.assets;
    this.projectService.observeState(project => this.assetsPath = project.paths.assets);
  }

  async selectFile() {

    let file = await this.fileService.selectExistingFile([this.fileFilter], this.assetsPath);

    if (file) {

      if (!file.startsWith(this.assetsPath)) {
        // TODO display a notification
        return;
      }

      this.file = file.split(this.assetsPath)[1].substring(1);
    }
  }
}
