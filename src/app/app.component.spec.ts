import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { DevisComponent } from "./components/devis/devis.component";
import { DialogDeleteComponent } from "./shared/dialog-delete/dialog-delete.component";
import { ProjetComponent } from "./components/projet/projet.component";
import { AddProjetDialogComponent } from "./components/projet/dialog/add-projet-dialog/add-projet-dialog.component";
import { EditProjetDialogComponent } from "./components/projet/dialog/edit-projet-dialog/edit-projet-dialog.component";
import { PlanComponent } from "./components/plan/plan.component";
import { AddPlanDialogComponent } from "./components/plan/dialog/add-plan-dialog/add-plan-dialog/add-plan-dialog.component";
import { EditPlanDialogComponent } from "./components/plan/dialog/edit-plan-dialog/edit-plan-dialog/edit-plan-dialog.component";
import { GestionStockComponent } from "./components/gestion-stock/gestion-stock.component";
import { SnackBarComponent } from "./shared/snack-bar/snack-bar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material-module";
import { MatTableModule } from "@angular/material";
import { ClientComponent } from "./components/client/client.component";
import { VoirDevisComponent } from "./components/devis/voir-devis/voir-devis.component";

describe("AppComponent", () => {
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
        MatTableModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
