import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Scene } from '../../types/scene';
import { SceneService } from '../../services/scene.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      this.scene = this.sceneService.getItem(params.id);
      this.form.setValue({
        name: this.scene.name
      }, {
        emitEvent: false
      })
    });
  }
}
