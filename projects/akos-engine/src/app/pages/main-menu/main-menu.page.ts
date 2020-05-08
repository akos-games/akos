import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameDescriptorState } from '../../core/states/game-descriptor.state';
import { AssetService } from '../../core/services/asset.service';
import { ApplicationService } from '../../core/services/application.service';
import { GameService } from '../../core/services/game.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private gameService: GameService
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

  newGame() {
    this.gameService.newGame();
  }

  exit() {
    this.applicationService.exit();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
