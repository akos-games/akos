import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Track } from 'akos-common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ak-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input() track: Track;
  @Output() update = new EventEmitter<Track>();
  @Output() delete = new EventEmitter<Track>();

  form: FormGroup = this.fb.group({
    id: null,
    name: null,
    file: null
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe(value => {
          this.update.emit(value);
      });

    this.form.setValue(this.track, {emitEvent: false});
  }

  onDelete() {
    this.delete.emit(this.track);
  }
}
