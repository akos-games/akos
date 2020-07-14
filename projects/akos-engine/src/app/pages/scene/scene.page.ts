import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { SceneService } from '../../core/services/scene.service';
import { AssetService } from '../../core/services/asset.service';
import { filter, takeUntil } from 'rxjs/operators';
import { GameState } from '../../core/states/game.state';
import { Subject } from 'rxjs';
import { UiState } from '../../core/states/ui.state';

@Component({
  selector: 'page-scene',
  templateUrl: './scene.page.html',
  styleUrls: ['./scene.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenePage implements OnInit, OnDestroy {

  pictureUrl: string;
  fullscreen: boolean;
  textContent: string;
  textVisible: boolean;

  showPauseMenu = false;

  private unsubscribe$ = new Subject();

  constructor(
    private gameState: GameState,
    private uiState: UiState,
    private sceneService: SceneService,
    private assetService: AssetService,
    private hotkeysService: HotkeysService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

    this.initHotkeys();

    this.gameState.observe()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(game => !!game?.scene)
      )
      .subscribe(game => {
        this.pictureUrl = this.assetService.getAssetUrl(game.scene.picture.asset);
        this.fullscreen = game.scene.picture.fullscreen;
        this.textContent = game.scene.text.content?.replace(/\n/g, '<br>');
        this.textVisible = game.scene.text.visible;
        this.cdRef.detectChanges();
      });

    this.uiState.observe()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.initHotkeys());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('click')
  onClick() {
    if (!this.showPauseMenu) {
      this.sceneService.nextCommand();
    }
  }

  onPauseMenuClosed() {
    this.showPauseMenu = false;
    this.cdRef.detectChanges();
    this.initHotkeys();
  }

  private initHotkeys() {

    this.hotkeysService.add([
      new Hotkey('space', () => {
        if (!this.showPauseMenu) {
          this.sceneService.nextCommand();
        }
        return false;
      }),
      new Hotkey('esc', () => {
        this.showPauseMenu = !this.showPauseMenu;
        this.cdRef.detectChanges();
        return false;
      })
    ]);
  }
}
