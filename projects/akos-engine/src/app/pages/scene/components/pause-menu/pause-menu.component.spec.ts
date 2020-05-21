import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseMenuComponent } from './pause-menu.component';

describe('PauseMenuComponent', () => {
  let component: PauseMenuComponent;
  let fixture: ComponentFixture<PauseMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
