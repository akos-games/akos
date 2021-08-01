import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkosCommonComponent } from './akos-common.component';

describe('AkosCommonComponent', () => {
  let component: AkosCommonComponent;
  let fixture: ComponentFixture<AkosCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkosCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AkosCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
