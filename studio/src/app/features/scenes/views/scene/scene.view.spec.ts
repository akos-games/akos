import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneView } from './scene.view';

describe('SceneComponent', () => {
  let component: SceneView;
  let fixture: ComponentFixture<SceneView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
