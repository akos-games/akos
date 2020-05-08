import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuPage } from './main-menu.page';

describe('MainMenuComponent', () => {
  let component: MainMenuPage;
  let fixture: ComponentFixture<MainMenuPage>;

  beforeEach(async(() => {
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
