import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaliteDePaiementComponent } from './modalite-de-paiement.component';

describe('ModaliteDePaiementComponent', () => {
  let component: ModaliteDePaiementComponent;
  let fixture: ComponentFixture<ModaliteDePaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaliteDePaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaliteDePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
