import { State } from 'akos-common';
import { Ui } from '../types/ui';
import { Injectable } from '@angular/core';

@Injectable()
export class UiState extends State<Ui> {

  constructor() {
    super();
    this.subject.next({
      loading: false,
      errors: [],
      errorDialogOpen: false
    });
  }

  setErrorDialogOpen(open: boolean) {
    this.set({...this.subject.value, errorDialogOpen: open});
  }

  setErrors(errors) {
    this.set({...this.subject.value, errors});
  }

  setLoading(loading: boolean) {
    this.set({...this.subject.value, loading});
  }
}
