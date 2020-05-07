import { Injectable } from '@angular/core';
import { ThemeState } from '../states/theme.state';
import { Theme } from 'akos-common';

@Injectable()
export class ThemeService {

  constructor(private themeState: ThemeState) {
    this.resetTheme();
  }

  updateTheme(theme: Theme) {
    this.themeState.set(theme);
  }

  resetTheme() {
    this.themeState.set({
      mainMenuBackground: null
    });
  }
}
