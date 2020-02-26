import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../core/services/project.service';
import { NgForm } from '@angular/forms';
import { Game } from 'akos-common';
import { GameService } from '../core/services/game.service';

@Component({
  selector: 'ak-metadata',
  templateUrl: './metadata.view.html',
  styleUrls: ['./metadata.view.scss']
})
export class MetadataView implements OnInit {

  @ViewChild('form', {static: true}) ngForm: NgForm;

  game: Game;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.getObservable().subscribe(game => this.game = game);
    this.ngForm.form.valueChanges.subscribe(game => {this.gameService.setGame(game)});
  }
}
