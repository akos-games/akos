import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Scene } from '../../types/scene';
import { SceneService } from '../../services/scene.service';

@Component({
  selector: 'ak-scene',
  templateUrl: './scene.view.html',
  styleUrls: ['./scene.view.scss']
})
export class SceneView implements OnInit {

  scene: Scene;

  constructor(private route: ActivatedRoute, private sceneService: SceneService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.scene = this.sceneService.getItem(params.id);
    });
  }
}
