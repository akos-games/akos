import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SceneService } from '../core/services/scene.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { generateId } from '../shared/utils/node';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Command, Scene } from 'akos-common';

@Component({
  selector: 'ak-scene',
  templateUrl: './scene.view.html',
  styleUrls: ['./scene.view.scss']
})
export class SceneView implements OnInit {

  scene: Scene;
  form: FormGroup;

  constructor(fb: FormBuilder, private route: ActivatedRoute, private sceneService: SceneService) {

    this.form = fb.group({
      name: '',
    });

    this.form.valueChanges.subscribe(formValues => {
      this.scene.name = formValues.name;
      this.sceneService.updateScene(this.scene);
    });
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.scene = this.sceneService.getScene(params.id);
      this.form.setValue({
        name: this.scene.name
      }, {
        emitEvent: false
      })
    });
  }

  onAddCommand() {

    this.scene.commands.push({
      id: generateId(),
      type: 'displayText',
      comment: '',
      parameters: {
        waitForPlayer: true,
        fullscreen: true
      }
    });

    this.sceneService.updateScene(this.scene);
  }

  onDropCommand(event: CdkDragDrop<Command[]>) {
    moveItemInArray(this.scene.commands, event.previousIndex, event.currentIndex);
    this.sceneService.updateScene(this.scene);
  }

  onUpdateCommand() {
    this.sceneService.updateScene(this.scene);
  }

  onDeleteCommand(command: Command) {
    let index = this.scene.commands.findIndex(com => com.id === command.id);
    this.scene.commands.splice(index, 1);
    this.sceneService.updateScene(this.scene);
  }
}
