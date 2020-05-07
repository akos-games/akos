import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service';
import { ThemeState } from '../../core/states/theme.state';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'page-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss']
})
export class ThemePage implements OnInit, OnDestroy {

  themeForm = this.fb.group({
    mainMenuBackground: ''
  });

  private silent = false;
  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private themeState: ThemeState
  ) {
  }

  ngOnInit() {

    this.themeState
      .getObservable()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(() => !this.silent)
      )
      .subscribe(theme => this.themeForm.patchValue(theme));

    this.themeForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500)
      )
      .subscribe(theme => {
        this.silent = true;
        this.themeService.updateTheme(theme)
        this.silent = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
