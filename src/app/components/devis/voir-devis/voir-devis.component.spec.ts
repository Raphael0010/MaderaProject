import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirDevisComponent } from './voir-devis.component';

describe('VoirDevisComponent', () => {
  let component: VoirDevisComponent;
  let fixture: ComponentFixture<VoirDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
