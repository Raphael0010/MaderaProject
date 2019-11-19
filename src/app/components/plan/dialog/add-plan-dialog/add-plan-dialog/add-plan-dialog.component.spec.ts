import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanDialogComponent } from './add-plan-dialog.component';

describe('AddPlanDialogComponent', () => {
  let component: AddPlanDialogComponent;
  let fixture: ComponentFixture<AddPlanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
