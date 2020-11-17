import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameDescriptorState } from '../../core/states/game-descriptor.state';
import { AssetService } from '../../core/services/asset.service';
import { ApplicationService } from '../../core/services/application.service';
import { GameService } from '../../core/services/game.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from '../../core/services/settings.service';
import { SaveService } from '../../core/services/save.service';
import { SaveState } from '../../core/states/save.state';

@Component({
  selector: 'ak-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss']
})
export class MainMenuPage implements OnInit, OnDestroy {

  backgroundUrl: string;
  gameVersion: string;
  showContinue: boolean;

  private unsubscribe$ = new Subject();

  constructor(
    private saveState: SaveState,
    private applicationService: ApplicationService,
    private assetService: AssetService,
    private gameDescriptorState: GameDescriptorState,
    private gameService: GameService,
    private settingsService: SettingsService,
    private saveService: SaveService
  ) {
  }

  ngOnInit() {

    this.saveState
      .observe()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(saves => this.showContinue = !!saves.find(save => save.id === 'autosave'))

    this.gameDescriptorState
      .observe()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(descriptor => {
        this.backgroundUrl = this.assetService.getAssetUrl(descriptor.theme.mainMenuBackground);
        this.gameVersion = descriptor.game.version;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async continue() {
    await this.saveService.loadSave('autosave');
  }

  newGame() {
    this.gameService.newGame();
  }

  async loadGame() {
    await this.saveService.showLoadMenu();
  }

  showSettings() {
    this.settingsService.showSettings();
  }

  exit() {
    this.applicationService.exit();
  }
}
