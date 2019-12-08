import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeView } from './welcome.view';

describe('WelcomeComponent', () => {
  let component: WelcomeView;
  let fixture: ComponentFixture<WelcomeView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
