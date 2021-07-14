import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SceneService } from '../../core/services/scene.service';
import { AssetService } from '../../core/services/asset.service';
import { filter, takeUntil } from 'rxjs/operators';
import { GameState } from '../../core/states/game.state';
import { Subject } from 'rxjs';
import { UiState } from '../../core/states/ui.state';
import { SaveService } from '../../core/services/save.service';
import { UiService } from '../../core/services/ui.service';

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
  playerChoices: any[];

  showPauseMenu = false;

  windowOpen$ = this.uiState.observeWindowOpen();
  private unsubscribe$ = new Subject();

  constructor(
    private gameState: GameState,
    private uiService: UiService,
    private uiState: UiState,
    private sceneService: SceneService,
    private assetService: AssetService,
    private saveService: SaveService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

    this.uiService.bindHotkeys('scene', {
      'esc': () => {
        this.showPauseMenu = !this.showPauseMenu;
        this.cdRef.detectChanges();
      },
      'space': () => this.nextCommand(),
      'ctrl+s': () => this.saveService.createSave('quicksave'),
      'ctrl+l': () => this.saveService.loadSave('quicksave')
    });

    this.gameState
      .observeLoaded()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.showPauseMenu = false);

    this.gameState
      .observe()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(game => !!game?.scene)
      )
      .subscribe(game => {
        this.pictureUrl = this.assetService.getAssetUrl(game.scene.picture.asset);
        this.fullscreen = game.scene.picture.fullscreen;
        this.textContent = game.scene.text.content?.replace(/\n/g, '<br>');
        this.textVisible = game.scene.text.visible;
        this.playerChoices = game.scene.playerChoices;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.uiService.unbindHotkeys();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  nextCommand() {
    if (!this.showPauseMenu && !this.playerChoices) {
      this.sceneService.nextCommand();
    }
  }

  onChoiceClick(choice) {
    this.sceneService.selectChoice(choice);
  }

  onPauseMenuClosed() {
    this.showPauseMenu = false;
    this.cdRef.detectChanges();
  }
}
