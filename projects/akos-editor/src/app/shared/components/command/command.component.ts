import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import { Command } from 'akos-common';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MoveCommandDialogComponent } from '../move-command-dialog/move-command-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { UiService } from '../../../core/services/ui.service';
import { filter } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface CommandType {
  type: string;
  icon: string;
  text: string;
  header: 'green' | 'blue' | 'yellow' | 'red';
  parameters?: string[];
}

@Component({
  selector: 'ak-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('notVisible', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('notVisible => visible', [
        animate('1s')
      ]),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CommandComponent),
    multi: true
  }]
})
export class CommandComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {

  @Input() references: any;
  @Input() referenced: boolean;
  @Input() index: number;
  @Output() moveToStart = new EventEmitter<Command>();
  @Output() moveToEnd = new EventEmitter<Command>();
  @Output() moveToPosition = new EventEmitter<{command: Command, index: number}>();
  @Output() duplicate = new EventEmitter<Command>();
  @Output() delete = new EventEmitter<Command>();

  command: Command;
  choices: FormArray;
  form: FormGroup;
  selectableReferences: {commandId: number; text: string;}[];
  animationState = 'notVisible';

  types: CommandType[] = [{
    type: 'displayText',
    icon: 'text-box',
    text: 'Display text',
    header: 'green',
    parameters: ['waitForPlayer', 'text']
  }, {
    type: 'hideText',
    icon: 'text-box-remove',
    text: 'Hide text',
    header: 'green',
    parameters: ['waitForPlayer']
  }, {
    type: 'displayPicture',
    icon: 'image',
    text: 'Display picture',
    header: 'green',
    parameters: ['waitForPlayer', 'picture', 'fullscreen']
  }, {
    type: 'startScene',
    icon: 'movie-open',
    text: 'Start scene',
    header: 'red',
    parameters: ['sceneId']
  }, {
    type: 'jumpToCommand',
    icon: 'debug-step-over',
    text: 'Jump to command',
    header: 'yellow',
    parameters: ['toCommand']
  }, {
    type: 'playerChoice',
    icon: 'arrow-decision',
    text: 'Player choice',
    header: 'green',
    parameters: ['choices']
  }];

  private propagateChange = _ => {};

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private uiService: UiService
  ) {
    this.types = this.types.sort((a, b) => a.text.localeCompare(b.text));
  }

  ngOnInit() {

    this.form = this.fb.group({
      id: null,
      type: '',
      displayedSections: '',
      reference: new FormControl('', this.referenceValidator())
    });

    this.form.valueChanges
      .pipe(filter(value => value.id))
      .subscribe(value => {

      this.form.updateValueAndValidity({
        emitEvent: false
      });

      this.command = value;

      if (this.form.valid) {
        this.propagateChange(value);
      }
    });
  }

  ngAfterViewInit() {
    this.animationState = 'visible';
  }

  ngOnChanges(changes: SimpleChanges) {

    if (!this.command) {
      return;
    }

    changes.references && this.updateReferences(changes.references.currentValue);
  }

  writeValue(value) {
    this.value = value;
    this.updateReferences(this.references);
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
  }

  onMoveToStart() {
    this.moveToStart.emit(this.value);
  }

  onMoveToPosition() {

    const dialogRef = this.dialog.open(MoveCommandDialogComponent, {
      disableClose: true,
      data: {index: this.index}
    });

    dialogRef.afterClosed().subscribe(result => result && this.moveToPosition.emit({
      command: this.value,
      index: result
    }));
  }

  onMoveToEnd() {
    this.moveToEnd.emit(this.command);
  }

  onDuplicate() {
    this.duplicate.emit(this.command);
  }

  onDelete() {

    if (this.referenced) {
      this.uiService.notify('Command is referenced for a jump and can\'t be deleted');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => result && this.delete.emit(this.command));
  }

  selectedType() {
    return this.types.find(type => this.command.type === type.type);
  }

  onAddChoice() {
    this.choices.push(this.fb.group({
      toCommand: null,
      text: ''
    }));
    this.form.updateValueAndValidity();
  }

  onDeleteChoice(index: number) {
    this.choices.removeAt(index);
    this.form.updateValueAndValidity();
  }

  onMoveChoiceUp(index: number) {
    let controls = this.choices.controls;
    [controls[index - 1], controls[index]] = [controls[index], controls[index - 1]];
    this.form.updateValueAndValidity();
  }

  onMoveChoiceDown(index: number) {
    let controls = this.choices.controls;
    [controls[index], controls[index + 1]] = [controls[index + 1], controls[index]];
    this.form.updateValueAndValidity();
  }

  updateParametersForm() {

    this.choices = this.fb.array(this.command.parameters.choices?.map(choice => this.fb.group(choice)) || []);

    let parameters = {};
    let defaultParameters = {
      waitForPlayer: false,
      picture: '',
      fullscreen: false,
      text: '',
      sceneId: null,
      toCommand: null,
      choices: this.choices
    };

    this.types
      .find(type => type.type === this.command.type)
      .parameters
      .forEach(parameter => parameters[parameter] = defaultParameters[parameter]);

    this.form.setControl('parameters', this.fb.group(parameters));
  }

  get value() {
    return this.command;
  }

  set value(value) {
    this.command = value;
    this.updateParametersForm();
    this.form.setValue(value);
  }

  private updateReferences(references) {

    this.selectableReferences = Object.keys(references)
      .filter(commandId => commandId !== this.command.id.toString())
      .map(commandId => ({commandId: Number(commandId), text: references[Number(commandId)]}))
      .sort((a, b) => a.text.localeCompare(b.text));
  }

  private referenceValidator() {
    return (control: FormControl) => {

      if (!this.references) {
        return null;
      }

      let alreadyUsed = false;
      Object.keys(this.references).forEach(id => {
        if (control?.value !== '' && control?.value === this.references[id] && id !== this.command.id.toString()) {
          alreadyUsed = true;
        }
      });

      return alreadyUsed ? {alreadyUsed} : null;
    };
  }
}
