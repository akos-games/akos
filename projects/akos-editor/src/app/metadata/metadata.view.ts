import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../core/services/project.service';
import { NgForm } from '@angular/forms';
import { Game } from 'akos-common';
import { GameService } from '../core/services/game.service';
import { GameState } from '../core/states/game.state';

@Component({
  selector: 'ak-metadata',
  templateUrl: './metadata.view.html',
  styleUrls: ['./metadata.view.scss']
})
export class MetadataView implements OnInit {

  @ViewChild('form', {static: true}) ngForm: NgForm;

  game: Game;

  constructor(private gameService: GameService, private gameState: GameState) {
  }

  ngOnInit() {
    this.gameState.getObservable().subscribe(game => this.game = game);
    this.ngForm.form.valueChanges.subscribe(game => {this.gameService.updateGame(game)});
  }
}
