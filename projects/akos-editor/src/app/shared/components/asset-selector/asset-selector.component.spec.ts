import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetSelectorComponent } from './asset-selector.component';

describe('AssetComponent', () => {
  let component: AssetSelectorComponent;
  let fixture: ComponentFixture<AssetSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
