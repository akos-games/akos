import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Scene } from '../../../core/types/scene';
import { SceneStore } from '../../../core/stores/scene.store';

@Component({
  selector: 'ak-scene',
  templateUrl: './scene.view.html',
  styleUrls: ['./scene.view.css']
})
export class SceneView implements OnInit {

  scene: Scene;

  constructor(private route: ActivatedRoute, private sceneStore: SceneStore) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.scene = this.sceneStore.getItem(params.id);
    });
  }
}
