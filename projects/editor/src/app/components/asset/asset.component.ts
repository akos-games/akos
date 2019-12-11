import { Component, Input, OnInit } from '@angular/core';
import { FileFilter } from 'electron';
import { ProjectStore } from '../../stores/project.store';
import { FileService } from '../../services/file.service';

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

  constructor(private projectStore: ProjectStore, private fileService: FileService) {
  }

  ngOnInit() {
    this.assetsPath = this.projectStore.getState().paths.assets;
    this.projectStore.state$.subscribe(project => this.assetsPath = project.paths.assets);
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
