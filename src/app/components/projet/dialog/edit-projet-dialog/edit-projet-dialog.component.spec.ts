import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjetDialogComponent } from './edit-projet-dialog.component';

describe('EditProjetDialogComponent', () => {
  let component: EditProjetDialogComponent;
  let fixture: ComponentFixture<EditProjetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
