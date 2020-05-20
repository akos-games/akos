import { State } from 'akos-common';
import { Injectable } from '@angular/core';

export interface Ui {
  displaySettings: boolean;
}

@Injectable()
export class UiState extends State<Ui> {

  constructor() {
    super();
    this.subject.next({
      displaySettings: false
    });
  }

  displaySettings(visibility: boolean) {
    this.set({...this.get(), displaySettings: visibility});
  }
}
