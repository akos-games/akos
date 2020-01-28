import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SceneService } from '../../services/scene.service';

@Component({
  selector: 'ak-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {

  @Input() objectId: number;
  @Input() type: string;

  @Output() objectIdChange = new EventEmitter<number>();

  options: {value: number; label: string}[] = [];

  constructor(private sceneService: SceneService) {
  }

  ngOnInit() {
    if (this.type === 'scene') {
      this.sceneService.observeEntities(scenes => this.options = scenes.map(scene => ({value: scene.id, label: scene.name})));
    }
  }

  onValueChange(value) {
    this.objectId = value;
    this.objectIdChange.emit(this.objectId);
  }
}
