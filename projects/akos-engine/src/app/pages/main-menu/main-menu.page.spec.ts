import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainMenuPage } from './main-menu.page';

describe('MainMenuComponent', () => {
  let component: MainMenuPage;
  let fixture: ComponentFixture<MainMenuPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenuPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
