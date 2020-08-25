import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScenesService } from '../../core/services/scenes.service';
import { FormBuilder } from '@angular/forms';
import { generateId } from '../../shared/utils/entity.util';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Command, deepCopy } from 'akos-common';
import { ScenesState } from '../../core/states/scenes.state';
import { concatMap, debounceTime, delay, filter, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { UiService } from '../../core/services/ui.service';
import { fromArray } from 'rxjs/internal/observable/fromArray';

@Component({
  selector: 'page-scene',
  templateUrl: './scene.page.html',
  styleUrls: ['./scene.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenePage implements OnInit, OnDestroy {

  references = {};
  referencedCommands: number[] = [];
  sceneLoading = false;
  commands = this.fb.array([]);
  sceneForm = this.fb.group({
    id: null,
    name: '',
    comments: '',
    commands: this.commands
  });

  private sceneId: number;
  private unsubscribe$ = new Subject();
  private sceneChange$ = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
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
      .subscribe(params => this.loadScene(params.id));

    this.sceneForm.valueChanges
      .pipe(
        filter(() => !this.sceneLoading),
        debounceTime(500),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(value => {
        this.updateReferences(value.commands);
        this.scenesService.updateScene(value);
        this.changeDetectorRef.detectChanges();
      });

    this.scenesState
      .observe()
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
    this.sceneChange$.complete();
  }

  onDeleteScene() {
    this.scenesService.deleteScene(this.sceneId);
  }

  onAddCommand() {
    this.commands.push(this.fb.control({
      id: generateId(),
      type: 'displayText',
      displayedSections: ['body'],
      reference: '',
      parameters: {
        waitForPlayer: true,
        text: ''
      }
    }));
  }

  onMoveCommandToStart(command: Command) {
    moveItemInArray(this.commands.controls, this.getCommandIndex(command), 0);
    this.commands.updateValueAndValidity();
  }

  onMoveCommandToEnd(command: Command) {
    moveItemInArray(this.commands.controls, this.getCommandIndex(command), this.commands.length - 1);
    this.commands.updateValueAndValidity();
  }

  onMoveCommandToPosition(command: Command, index: number) {
    let maxIndex = this.commands.length - 1;
    moveItemInArray(this.commands.controls, this.getCommandIndex(command), index > maxIndex ? maxIndex : index);
    this.commands.updateValueAndValidity();
  }

  onDuplicate(command: Command) {
    this.commands.insert(this.getCommandIndex(command) + 1, this.fb.control({
      ...deepCopy(command),
      id: generateId()
    }));
  }

  onDeleteCommand(command: Command) {
    this.commands.removeAt(this.getCommandIndex(command));
  }

  onDropCommand(event: CdkDragDrop<Command[]>) {
    moveItemInArray(this.commands.controls, event.previousIndex, event.currentIndex);
    this.commands.updateValueAndValidity();
  }

  private loadScene(sceneId: number) {

    this.sceneChange$.next();

    let scene = this.scenesState.getById(sceneId);
    let commands = scene.commands;

    scene.commands = [];
    this.sceneId = scene.id;

    if(commands.length > 0) {
      this.sceneLoading = true;
    }

    this.commands.clear();
    this.sceneForm.setValue(scene);
    this.changeDetectorRef.detectChanges();

    fromArray(commands)
      .pipe(
        concatMap(command => of(command).pipe(delay(10))),
        takeUntil(this.sceneChange$)
      )
      .subscribe(command => {
        this.commands.push(this.fb.control(command));
        this.changeDetectorRef.detectChanges();
      })
      .add(() => {
        this.updateReferences(commands);
        this.sceneLoading = false;
      });
  }

  private updateReferences(commands: Command[]) {

    this.references = {};
    this.referencedCommands = [];

    commands.forEach(command => {

      if (command.reference) {
        this.references[command.id] = command.reference;
      }

      if (command.parameters.toCommand) {
        this.referencedCommands.push(command.parameters.toCommand);
      }

      if (command.parameters.choices) {

        Array.prototype.push.apply(
          this.referencedCommands,
          command.parameters.choices
            .filter(choice => choice.toCommand)
            .map(choice => choice.toCommand)
        );
      }
    });
  }

  private getCommandIndex(command: Command): number {
    return this.commands.getRawValue().findIndex(c => c.id === command.id);
  }
}
