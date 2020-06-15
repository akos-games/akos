import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScenesService } from '../../core/services/scenes.service';
import { FormBuilder } from '@angular/forms';
import { generateId } from '../../shared/utils/entity.util';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Command } from 'akos-common';
import { ScenesState } from '../../core/states/scenes.state';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'page-scene',
  templateUrl: './scene.page.html',
  styleUrls: ['./scene.page.scss']
})
export class ScenePage implements OnInit, OnDestroy {

  commands = this.fb.array([]);
  sceneForm = this.fb.group({
    id: null,
    name: '',
    commands: this.commands
  });

  private sceneId: number;
  private silent = false;
  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private scenesService: ScenesService,
    private scenesState: ScenesState
  ) {
  }

  ngOnInit() {

    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {

        const scene = this.scenesState.getById(params.id);
        this.sceneId = scene.id;
        this.silent = true;

        this.commands.clear();
        scene.commands.forEach(() => this.commands.push(this.fb.control({})));
        this.sceneForm.setValue(scene, {
          emitEvent: false
        });

        this.silent = false;
      });

    this.sceneForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(() => !this.silent),
        debounceTime(500)
      )
      .subscribe(value => this.scenesService.updateScene(value));

    this.scenesState
      .getObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(scenes => {
        if (!scenes.some(scene => scene.id === this.sceneId)) {
          this.router.navigateByUrl('/game');
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onDeleteScene() {
    this.scenesService.deleteScene(this.sceneId);
  }

  onAddCommand() {
    this.commands.push(this.fb.control({
      id: generateId(),
      type: 'displayText',
      comment: '',
      parameters: {
        waitForPlayer: true,
        text: ''
      }
    }));
  }

  onDeleteCommand(command: Command) {
    this.commands.removeAt(this.commands.getRawValue().findIndex(c => c.id === command.id));
  }

  onDropCommand(event: CdkDragDrop<Command[]>) {
    moveItemInArray(this.commands.controls, event.previousIndex, event.currentIndex);
    this.commands.updateValueAndValidity();
  }
}
