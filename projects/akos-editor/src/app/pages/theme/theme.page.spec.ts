import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThemePage } from './theme.page';

describe('ThemeComponent', () => {
  let component: ThemePage;
  let fixture: ComponentFixture<ThemePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
