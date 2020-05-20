import { Injectable } from '@angular/core';
import { State } from 'akos-common';

export interface Settings {
  fullscreen: boolean;
}

@Injectable()
export class SettingsState extends State<Settings> {
}
