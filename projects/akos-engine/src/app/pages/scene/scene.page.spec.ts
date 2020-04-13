import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenePage } from './scene.page';

describe('SceneComponent', () => {
  let component: ScenePage;
  let fixture: ComponentFixture<ScenePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
