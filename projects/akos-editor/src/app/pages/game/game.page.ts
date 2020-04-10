import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GameService } from '../../core/services/game.service';
import { GameState } from '../../core/states/game.state';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'page-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePage implements OnInit, OnDestroy {

  gameForm = this.fb.group({
    name: [''],
    version: [''],
    firstSceneId: [null]
  });

  private typing = false;
  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private gameState: GameState
  ) {
  }

  ngOnInit() {

    this.gameState.getObservable()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(() => !this.typing)
      )
      .subscribe(game => this.gameForm.patchValue(game));

    this.gameForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500)
      )
      .subscribe(game => {
        this.typing = true;
        this.gameService.updateGame(game)
        this.typing = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
