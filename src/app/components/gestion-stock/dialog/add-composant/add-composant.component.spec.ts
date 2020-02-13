import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComposantComponent } from './add-composant.component';

describe('AddComposantComponent', () => {
  let component: AddComposantComponent;
  let fixture: ComponentFixture<AddComposantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComposantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
