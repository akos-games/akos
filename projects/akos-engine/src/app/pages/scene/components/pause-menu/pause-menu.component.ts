import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameService } from '../../../../core/services/game.service';
import { ApplicationService } from '../../../../core/services/application.service';
import { SettingsService } from '../../../../core/services/settings.service';

@Component({
  selector: 'ak-pause-menu',
  templateUrl: './pause-menu.component.html',
  styleUrls: ['./pause-menu.component.scss']
})
export class PauseMenuComponent implements OnInit {

  @Output() close = new EventEmitter();

  constructor(
    private applicationService: ApplicationService,
    private gameService: GameService,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit() {
  }

  closeMenu(clickEvent) {
    clickEvent.stopPropagation();
    this.close.emit();
  }

  showSettings() {
    this.settingsService.showSettings();
  }

  exitToMainMenu() {
    this.gameService.exitGame();
  }

  exitToDesktop() {
    this.applicationService.exit();
  }
}
