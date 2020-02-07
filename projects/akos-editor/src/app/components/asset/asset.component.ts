import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FileFilter } from 'electron';
import { FileService } from '../../services/file.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'ak-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit, OnChanges {

  @Input() file: string;
  @Input() label: string;
  @Input() type: 'image';

  @Output() fileChange = new EventEmitter<string>();

  private assetsPath: string;
  private fileFilter: FileFilter;

  constructor(private projectService: ProjectService, private fileService: FileService) {
  }

  ngOnInit() {
    this.assetsPath = this.projectService.getState().paths.assets;
    this.projectService.observeState(project => this.assetsPath = project.paths.assets);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (!changes.type) {
      return;
    }

    switch (changes.type.currentValue) {

      case 'image':
        this.fileFilter = {name: 'Image', extensions: ['apng', 'bmp', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']};
        break;
    }
  }

  async selectFile() {

    let file = await this.fileService.selectExistingFile([this.fileFilter], this.assetsPath);

    if (file) {

      if (!file.startsWith(this.assetsPath)) {
        // TODO display a notification
        return;
      }

      this.file = file.split(this.assetsPath)[1].substring(1);
      this.fileChange.emit(this.file);
    }
  }
}
