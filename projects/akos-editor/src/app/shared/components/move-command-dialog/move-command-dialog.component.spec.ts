import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveCommandDialogComponent } from './move-command-dialog.component';

describe('MoveCommandDialogComponent', () => {
  let component: MoveCommandDialogComponent;
  let fixture: ComponentFixture<MoveCommandDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveCommandDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveCommandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
