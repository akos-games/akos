import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { SceneService } from '../../services/scene.service';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'scene-page',
  templateUrl: './scene.page.html',
  styleUrls: ['./scene.page.scss']
})
export class ScenePage implements OnInit {

  imgSrc: string;
  fullscreen: boolean;
  text: string;
  textVisible: boolean;

  constructor(
    private sceneService: SceneService,
    private assetService: AssetService,
    private hotkeysService: HotkeysService,
    private cdRef: ChangeDetectorRef) {

    this.hotkeysService.add(new Hotkey('space', () => {
      this.sceneService.nextCommand();
      return false;
    }));
  }

  ngOnInit() {
    this.sceneService.observeState(sceneRun => {
      this.imgSrc = this.assetService.getAssetUrl(sceneRun.picture);
      this.fullscreen = sceneRun.fullscreen;
      this.text = sceneRun.text;
      this.textVisible = sceneRun.textVisible;
      this.cdRef.detectChanges();
    });
  }

  @HostListener('click')
  onClick() {
    this.sceneService.nextCommand();
  }
}
