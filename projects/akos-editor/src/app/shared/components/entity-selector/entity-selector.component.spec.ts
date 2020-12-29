import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntitySelectorComponent } from './entity-selector.component';

describe('EntitySelectorComponent', () => {
  let component: EntitySelectorComponent;
  let fixture: ComponentFixture<EntitySelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
