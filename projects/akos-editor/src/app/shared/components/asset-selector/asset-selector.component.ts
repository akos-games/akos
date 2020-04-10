import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FileFilter } from 'electron';
import { NativeService } from 'akos-common';
import { ProjectState } from '../../../core/states/project.state';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ak-select-asset',
  templateUrl: './asset-selector.component.html',
  styleUrls: ['./asset-selector.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AssetSelectorComponent),
    multi: true
  }]
})
export class AssetSelectorComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

  @Input() type: 'image';
  @Input() required: boolean;

  private _value;
  private assetsPath: string;
  private fileFilter: FileFilter;
  private unsubscribe$ = new Subject();
  private propagateChange = _ => {};

  constructor(private nativeService: NativeService, private projectState: ProjectState) {
  }

  ngOnInit() {
    this.projectState.getObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(project => this.assetsPath = project?.assetsDir);
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async selectFile() {

    let file = await this.nativeService.showOpenDialog([this.fileFilter], {defaultPath: this.assetsPath});

    if (file) {

      if (!file.startsWith(this.assetsPath)) {
        // TODO display a notification
        return;
      }

      this.value = file.split(this.assetsPath)[1].substring(1);
    }
  }

  writeValue(value) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.propagateChange(this._value);
  }
}
