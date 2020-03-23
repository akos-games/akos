import { Component, forwardRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CollectionState } from 'akos-common';
import { ScenesState } from '../../../core/states/scenes.state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface EntityTypes {
  [type: string]: {
    icon: string;
    state: CollectionState<any>;
  }
}

@Component({
  selector: 'ak-select-entity',
  templateUrl: './entity-selector.component.html',
  styleUrls: ['./entity-selector.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EntitySelectorComponent),
    multi: true
  }]
})
export class EntitySelectorComponent implements OnChanges, OnDestroy, ControlValueAccessor {

  @Input() type: 'scene';
  @Input() required: boolean;

  entities: {id: number; name: string}[] = [];
  icon: string;

  private _value;
  private types: EntityTypes;
  private unsubscribe$ = new Subject();
  private propagateChange = _ => {};

  constructor(private scenesState: ScenesState) {
    this.types = {
      scene: {
        icon: 'movie_creation',
        state: scenesState
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.type) {

      // Reset subscription to avoid memory leaks
      this.unsubscribe();
      this.unsubscribe$ = new Subject();

      this.icon = this.types[this.type].icon;
      this.types[this.type].state.getObservable()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(entities => this.entities = entities);
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  writeValue(value) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
  }

  private unsubscribe() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.propagateChange(this._value);
  }
}
