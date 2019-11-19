import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjetDialogComponent } from './add-projet-dialog.component';

describe('AddProjetDialogComponent', () => {
  let component: AddProjetDialogComponent;
  let fixture: ComponentFixture<AddProjetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
