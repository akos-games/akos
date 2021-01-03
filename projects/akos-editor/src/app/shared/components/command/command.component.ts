import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import { Command, deepCopy } from 'akos-common';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MoveCommandDialogComponent } from '../move-command-dialog/move-command-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { UiService } from '../../../core/services/ui.service';
import { filter } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommandType, Constants } from '../../../core/constants';

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

  type: CommandType;

  private propagateChange = _ => {
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private uiService: UiService
  ) {
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
    this.changeDetectorRef.detectChanges();
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

    let parameters = deepCopy(this.type.defaults);

    this.choices = this.fb.array(this.command.parameters.choices?.map(choice => this.fb.group(choice)) || []);
    if (this.choices.length > 0) {
      parameters.choices = this.choices;
    }

    this.form.setControl('parameters', this.fb.group(parameters));
  }

  get value() {
    return this.command;
  }

  set value(value) {
    this.command = value;
    this.type = Constants.commandTypes.find(type => type.type === value.type);
    this.command.parameters?.choices?.forEach(choice => choice.toCommand = choice.toCommand || null);
    this.updateParametersForm();
    this.form.setValue(value);
    this.changeDetectorRef.detectChanges();
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
