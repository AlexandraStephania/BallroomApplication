import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBallroomDialogComponent } from './new-ballroom-dialog.component';

describe('NewBallroomDialogComponent', () => {
  let component: NewBallroomDialogComponent;
  let fixture: ComponentFixture<NewBallroomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBallroomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBallroomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
