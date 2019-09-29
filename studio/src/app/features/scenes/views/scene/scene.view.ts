import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.view.html',
  styleUrls: ['./scene.view.css']
})
export class SceneView implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
