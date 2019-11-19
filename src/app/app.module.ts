import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ProjetComponent } from "./components/projet/projet.component";
import { MaterialModule } from "./material-module";
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { DevisComponent } from "./components/devis/devis.component";
import { DialogDeleteComponent } from "./shared/dialog-delete/dialog-delete.component";
import { AddProjetDialogComponent } from "./components/projet/dialog/add-projet-dialog/add-projet-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditProjetDialogComponent } from "./components/projet/dialog/edit-projet-dialog/edit-projet-dialog.component";
import { PlanComponent } from "./components/plan/plan.component";
import { AddPlanDialogComponent } from "./components/plan/dialog/add-plan-dialog/add-plan-dialog/add-plan-dialog.component";
import { EditPlanDialogComponent } from "./components/plan/dialog/edit-plan-dialog/edit-plan-dialog/edit-plan-dialog.component";

@NgModule({
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
    EditPlanDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    MatTableModule
  ],
  entryComponents: [
    DialogDeleteComponent,
    AddProjetDialogComponent,
    EditProjetDialogComponent,
    AddPlanDialogComponent,
    EditPlanDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
