import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RemisePlanDialogComponent } from "./remise-plan-dialog.component";

describe("RemisePlanDialogComponent", () => {
  let component: RemisePlanDialogComponent;
  let fixture: ComponentFixture<RemisePlanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemisePlanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemisePlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
