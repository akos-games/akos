import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { Command, deepCopy } from 'akos-common';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

const defaultParameters = {
  waitForPlayer: false,
  picture: '',
  fullscreen: false,
  text: '',
  sceneId: null
};

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
export class CommandComponent implements OnInit, ControlValueAccessor {

  @Input() command: Command;
  @Output() delete = new EventEmitter<Command>();

  form = this.fb.group({
    id: null,
    type: '',
    comment: '',
    parameters: this.fb.group(defaultParameters)
  });

  private propagateChange = _ => {};

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(value => this.propagateChange(this.formatOutputValue(value)));
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

  private formatOutputValue(value: Command): Command {

    const parametersByTypes = {
      displayPicture: ['waitForPlayer', 'picture', 'fullscreen'],
      displayText: ['waitForPlayer', 'text'],
      hideText: ['waitForPlayer'],
      startScene: ['sceneId']
    };

    const formattedValue = deepCopy(value);
    formattedValue.id = this.command.id;
    Object.keys(formattedValue.parameters).forEach(parameter =>
      parametersByTypes[formattedValue.type].includes(parameter) || delete formattedValue.parameters[parameter]
    );

    return formattedValue;
  }

  get value() {
    return this.formatOutputValue(this.form.getRawValue());
  }

  set value(value) {
    this.form.setValue({...value, parameters: Object.assign(defaultParameters, value.parameters)});
    this.propagateChange(this.formatOutputValue(value));
  }
}
