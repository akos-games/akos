import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScenesService } from '../../core/services/scenes.service';
import { FormBuilder } from '@angular/forms';
import { generateId } from '../../shared/utils/entity.util';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Command } from 'akos-common';
import { ScenesState } from '../../core/states/scenes.state';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'page-scene',
  templateUrl: './scene.page.html',
  styleUrls: ['./scene.page.scss']
})
export class ScenePage implements OnInit {

  commands = this.fb.array([]);
  sceneForm = this.fb.group({
    id: null,
    name: '',
    commands: this.commands
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private scenesService: ScenesService,
    private scenesState: ScenesState
  ) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const scene = this.scenesState.getById(params.id);
      scene.commands.forEach(() => this.commands.push(this.fb.control({})));
      this.sceneForm.setValue(scene, {
        emitEvent: false
      });
    });

    this.sceneForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => this.scenesService.updateScene(value));
  }

  onAddCommand() {
    this.commands.push(this.fb.control({
      id: generateId(),
      type: 'displayText',
      comment: '',
      parameters: {
        waitForPlayer: true,
        text: ''
      }
    }));
  }

  onDeleteCommand(command: Command) {
    this.commands.removeAt(this.commands.getRawValue().findIndex(c => c.id === command.id));
  }

  onDropCommand(event: CdkDragDrop<Command[]>) {
    moveItemInArray(this.commands.controls, event.previousIndex, event.currentIndex);
    this.commands.updateValueAndValidity();
  }
}
