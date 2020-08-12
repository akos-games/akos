import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SceneService } from '../../core/services/scene.service';
import { AssetService } from '../../core/services/asset.service';
import { filter, takeUntil } from 'rxjs/operators';
import { GameState } from '../../core/states/game.state';
import { Subject } from 'rxjs';
import { UiState } from '../../core/states/ui.state';
import { ShortcutInput } from 'ng-keyboard-shortcuts';

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
  shortcuts: ShortcutInput[] = [];

  windowOpen$ = this.uiState.observeWindowOpen();
  private unsubscribe$ = new Subject();

  constructor(
    private gameState: GameState,
    private uiState: UiState,
    private sceneService: SceneService,
    private assetService: AssetService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

    this.shortcuts.push({
      key: 'space',
      preventDefault: true,
      command: () => this.nextCommand()
    }, {
      key: 'esc',
      preventDefault: true,
      command: () => {
        this.showPauseMenu = !this.showPauseMenu;
        this.cdRef.detectChanges();
      }
    });

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
