import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Scene } from '../../types/scene';
import { SceneStore } from '../../stores/scene.store';

@Component({
  selector: 'ak-scene',
  templateUrl: './scene.view.html',
  styleUrls: ['./scene.view.scss']
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
