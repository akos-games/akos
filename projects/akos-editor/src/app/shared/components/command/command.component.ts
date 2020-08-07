import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Command, deepCopy } from 'akos-common';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

const defaultParameters = {
  waitForPlayer: false,
  picture: '',
  fullscreen: false,
  text: '',
  sceneId: null
};

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CommandComponent),
    multi: true
  }]
})
export class CommandComponent implements OnInit, ControlValueAccessor {

  @Input() command: Command;
  @Output() delete = new EventEmitter<Command>();

  expressionEnabled = false;

  form = this.fb.group({
    id: null,
    type: '',
    comment: '',
    parameters: this.fb.group(defaultParameters)
  });

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
  }];

  private propagateChange = _ => {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.types = this.types.sort((a, b) => a.text.localeCompare(b.text));
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

  selectedType() {
    return this.types.find(type => this.form.getRawValue().type === type.type);
  }

  private formatOutputValue(value: Command): Command {

    const formattedValue = deepCopy(value);
    formattedValue.id = this.command.id;
    Object.keys(formattedValue.parameters).forEach(parameter =>
      this.selectedType().parameters.includes(parameter) || delete formattedValue.parameters[parameter]
    );

    return formattedValue;
  }

  get value() {
    return this.formatOutputValue(this.form.getRawValue());
  }

  set value(value) {
    this.form.setValue({...value, parameters: Object.assign(defaultParameters, value.parameters)});
    this.expressionEnabled = !!value.condition;
    this.propagateChange(this.formatOutputValue(value));
  }
}
