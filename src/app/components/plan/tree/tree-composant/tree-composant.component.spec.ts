import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeComposantComponent } from './tree-composant.component';

describe('TreeComposantComponent', () => {
  let component: TreeComposantComponent;
  let fixture: ComponentFixture<TreeComposantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeComposantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
