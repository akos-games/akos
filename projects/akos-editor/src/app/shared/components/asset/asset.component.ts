import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FileFilter } from 'electron';
import { NativeService } from 'akos-common';
import { ProjectState } from '../../../core/states/project.state';

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

  constructor(private nativeService: NativeService, private projectState: ProjectState) {
  }

  ngOnInit() {
    this.projectState.getObservable().subscribe(project => this.assetsPath = project?.assetsDir);
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

    let file = await this.nativeService.showOpenDialog([this.fileFilter], {defaultPath: this.assetsPath});

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
