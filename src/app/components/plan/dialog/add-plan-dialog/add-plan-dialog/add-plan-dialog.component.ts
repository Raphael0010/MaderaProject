import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DATE_LOCALE, DateAdapter } from "@angular/material/core";
import { Plan } from "src/app/models/plan.model";
import { PlanService } from "src/app/services/plan.service";

@Component({
  selector: "app-add-plan-dialog",
  templateUrl: "./add-plan-dialog.component.html",
  styleUrls: ["./add-plan-dialog.component.css"],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: "fr"}
  ],
})
export class AddPlanDialogComponent implements OnInit {

  planForm: FormGroup ;
  plan: Plan = new Plan();

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddPlanDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private planService: PlanService, private adapter: DateAdapter<any>) {
    this.adapter.setLocale("fr");
  }

  ngOnInit() {
    this.initForm() ;
  }

  initForm() {
    this.planForm = this.formBuilder.group({
      dateCreation: ["", Validators.required],
      nbPieces: ["", Validators.required],
      nbChambres: ["", Validators.required],
      nbEtage: ["", Validators.required],
      surface: ["", Validators.required],
    });
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    const formValue = this.planForm.value;
    this.plan.dateCreation =  formValue.dateCreation ;
    this.plan.nbPieces = formValue.nbPieces ;
    this.plan.nbEtage = formValue.nbEtage;
    this.plan.surface = formValue.surface;
    this.plan.idDevis = this.data.id ;
    this.planService.addPlan(this.plan);
  }
}
