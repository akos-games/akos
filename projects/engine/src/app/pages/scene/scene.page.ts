import { Component, HostListener, OnInit } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { SceneService } from '../../services/scene.service';

@Component({
  selector: 'scene-page',
  templateUrl: './scene.page.html',
  styleUrls: ['./scene.page.scss']
})
export class ScenePage implements OnInit {

  constructor(private sceneService: SceneService, private hotkeysService: HotkeysService) {

    this.hotkeysService.add(new Hotkey('space', () => {
      this.sceneService.nextCommand();
      return false;
    }));
  }

  ngOnInit() {
  }

  @HostListener('click')
  onClick() {
    this.sceneService.nextCommand();
  }
}
