import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePage } from './welcome.page';

describe('WelcomeComponent', () => {
  let component: WelcomePage;
  let fixture: ComponentFixture<WelcomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
