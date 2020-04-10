import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Command, deepCopy } from 'akos-common';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ak-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CommandComponent),
    multi: true
  }]
})
export class CommandComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() command: Command;
  @Output() delete = new EventEmitter<Command>();

  form = this.fb.group({
    type: [''],
    comment: [''],
    parameters: this.fb.group({
      waitForPlayer: [false],
      picture: [''],
      fullscreen: [false],
      text: [''],
      sceneId: [null]
    })
  });

  private propagateChange = _ => {};

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(value => this.propagateChange(this.cleanCommand({...value, id: this.command.id})));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form.setValue(changes.command.currentValue);
  }

  writeValue(value) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
  }

  onDelete() {
    this.delete.emit(this.value);
  }

  isGreenHeader() {
    return ['displayText', 'hideText', 'displayPicture'].includes(this.value.type);
  }

  isRedHeader() {
    return ['startScene'].includes(this.value.type);
  }

  isDisplayPictureCommand(): boolean {
    return this.value.type === 'displayPicture';
  }

  isDisplayTextCommand(): boolean {
    return this.value.type === 'displayText';
  }

  isHideTextCommand(): boolean {
    return this.value.type === 'hideText';
  }

  isStartSceneCommand(): boolean {
    return this.value.type === 'startScene';
  }

  private cleanCommand(command: Command): Command {

    const parametersByTypes = {
      displayPicture: ['waitForPlayer', 'picture', 'fullscreen'],
      displayText: ['waitForPlayer', 'text'],
      hideText: ['waitForPlayer'],
      startScene: ['sceneId']
    };

    const cleanedCommand = deepCopy(command);
    Object.keys(cleanedCommand.parameters).forEach(parameter =>
      parametersByTypes[cleanedCommand.type].includes(parameter) || delete cleanedCommand.parameters[parameter]
    );

    return cleanedCommand;
  }

  get value() {
    return this.cleanCommand({...this.form.getRawValue(), id: this.command.id});
  }

  set value(value) {
    this.form.setValue(value);
    this.propagateChange(this.cleanCommand({...value, id: this.command.id}));
  }
}
