import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameDescriptorState } from '../../core/states/game-descriptor.state';
import { AssetService } from '../../core/services/asset.service';
import { ApplicationService } from '../../core/services/application.service';
import { GameService } from '../../core/services/game.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'ak-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss']
})
export class MainMenuPage implements OnInit, OnDestroy {

  backgroundUrl: string;
  gameVersion: string;

  private unsubscribe$ = new Subject();

  constructor(
    private applicationService: ApplicationService,
    private assetService: AssetService,
    private gameDescriptorState: GameDescriptorState,
    private gameService: GameService,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit() {

    this.gameDescriptorState
      .getObservable()
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

  newGame() {
    this.gameService.newGame();
  }

  showSettings() {
    this.settingsService.showSettings();
  }

  exit() {
    this.applicationService.exit();
  }
}
