import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GestionStockComponent } from "./gestion-stock.component";
import { AppComponent } from "src/app/app.component";
import { LoginComponent } from "../login/login.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { NavBarComponent } from "src/app/shared/nav-bar/nav-bar.component";
import { DevisComponent } from "../devis/devis.component";
import { DialogDeleteComponent } from "src/app/shared/dialog-delete/dialog-delete.component";
import { ProjetComponent } from "../projet/projet.component";
import { AddProjetDialogComponent } from "../projet/dialog/add-projet-dialog/add-projet-dialog.component";
import { EditProjetDialogComponent } from "../projet/dialog/edit-projet-dialog/edit-projet-dialog.component";
import { PlanComponent } from "../plan/plan.component";
import { AddPlanDialogComponent } from "../plan/dialog/add-plan-dialog/add-plan-dialog/add-plan-dialog.component";
import { EditPlanDialogComponent } from "../plan/dialog/edit-plan-dialog/edit-plan-dialog/edit-plan-dialog.component";
import { SnackBarComponent } from "src/app/shared/snack-bar/snack-bar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "src/app/app-routing.module";
import { MaterialModule } from "src/app/material-module";
import { MatTableModule } from "@angular/material";
import { ClientComponent } from "../client/client.component";
import { VoirDevisComponent } from "../devis/voir-devis/voir-devis.component";

describe("GestionStockComponent", () => {
  let component: GestionStockComponent;
  let fixture: ComponentFixture<GestionStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent,
        NavBarComponent,
        DevisComponent,
        DialogDeleteComponent,
        ProjetComponent,
        NavBarComponent,
        AddProjetDialogComponent,
        EditProjetDialogComponent,
        PlanComponent,
        AddPlanDialogComponent,
        EditPlanDialogComponent,
        GestionStockComponent,
        SnackBarComponent,
        ClientComponent,
        VoirDevisComponent
      ],
      imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MaterialModule,
        MatTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
