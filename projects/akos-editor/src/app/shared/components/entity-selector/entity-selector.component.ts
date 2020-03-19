import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { State } from 'akos-common';
import { ScenesState } from '../../../core/states/scenes.state';

interface EntityTypes {
  [type: string]: {
    icon: string;
    state: State<any>;
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
export class EntitySelectorComponent implements OnInit, ControlValueAccessor {

  get entityId() {
    return this._entityId;
  }
  set entityId(entityId) {
    this._entityId = entityId;
    this.propagateChange(this._entityId);
  }
  private _entityId;

  @Input() type: 'scene';

  entities: {id: number; name: string}[] = [];
  icon: string;

  private propagateChange = (_: any) => {};
  private types: EntityTypes;

  constructor(private scenesState: ScenesState) {
    this.types = {
      scene: {
        icon: 'movie_creation',
        state: scenesState
      }
    }
  }

  ngOnInit() {
    this.icon = this.types[this.type].icon;
    this.types[this.type].state.getObservable().subscribe(entities => this.entities = entities);
  }

  writeValue(value: any): void {
    this.entityId = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }
}
