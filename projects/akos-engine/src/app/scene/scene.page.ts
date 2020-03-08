import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { SceneService } from '../core/services/scene.service';
import { AssetService } from '../core/services/asset.service';
import { filter } from 'rxjs/operators';
import { GameState } from '../core/states/game.state';

@Component({
  selector: 'scene-page',
  templateUrl: './scene.page.html',
  styleUrls: ['./scene.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenePage implements OnInit {

  pictureUrl: string;
  fullscreen: boolean;
  textContent: string;
  textVisible: boolean;

  constructor(
    private gameState: GameState,
    private sceneService: SceneService,
    private assetService: AssetService,
    private hotkeysService: HotkeysService,
    private cdRef: ChangeDetectorRef
  ) {
    this.hotkeysService.add(new Hotkey('space', () => {
      this.sceneService.nextCommand();
      return false;
    }));
  }

  ngOnInit() {

    this.gameState.getObservable()
      .pipe(filter(game => !!game?.scene))
      .subscribe(game => {
        this.pictureUrl = this.assetService.getAssetUrl(game.scene.picture.asset);
        this.fullscreen = game.scene.picture.fullscreen;
        this.textContent = game.scene.text.content;
        this.textVisible = game.scene.text.visible;
        this.cdRef.detectChanges();
      });
  }

  @HostListener('click')
  onClick() {
    this.sceneService.nextCommand();
  }
}
