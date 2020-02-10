import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { SceneService } from '../../services/scene.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EntityService } from 'akos-common';

interface EntityTypes {
  [type: string]: {
    icon: string;
    service: EntityService<any>
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

  constructor(private sceneService: SceneService) {
    this.types = {
      scene: {
        icon: 'movie_creation',
        service: sceneService
      }
    }
  }

  ngOnInit() {
    this.icon = this.types[this.type].icon;
    this.types[this.type].service.observeEntities(entities => this.entities = entities);
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
