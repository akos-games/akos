import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SceneService } from '../../services/scene.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Scene } from 'akos-common/types/scene';
import { generateId } from '../../utils/node';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Command } from 'akos-common/types/command';

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
      this.sceneService.updateEntity(this.scene);
    });
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.scene = this.sceneService.getEntity(params.id);
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

    this.sceneService.updateEntity(this.scene);
  }

  onDropCommand(event: CdkDragDrop<Command[]>) {
    moveItemInArray(this.scene.commands, event.previousIndex, event.currentIndex);
    this.sceneService.updateEntity(this.scene);
  }

  onUpdateCommand() {
    this.sceneService.updateEntity(this.scene);
  }

  onDeleteCommand(command: Command) {
    let index = this.scene.commands.findIndex(com => com.id === command.id);
    this.scene.commands.splice(index, 1);
    this.sceneService.updateEntity(this.scene);
  }
}
