import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DATE_LOCALE, DateAdapter } from "@angular/material/core";
import { Plan } from "src/app/models/plan.model";
import { PlanService } from "src/app/services/plan.service";
import { callApiFree } from "./../../../../../core/ApiCall";
import { MatTableDataSource } from "@angular/material";
import { Module } from "src/app/models/module.model";

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
  modules: Module[] ;
  listModules: Module[] = [];
  dataSource: MatTableDataSource<Module> ;
  displayedColumns: string[] = ["Module", "buttons"];


  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddPlanDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private planService: PlanService, private adapter: DateAdapter<any>) {
    this.adapter.setLocale("fr");
    this.dataSource = new MatTableDataSource<Module>() ;
  }

  async ngOnInit() {
    this.getModule() ;
    this.initForm() ;
    this.plan.idProjet = this.data.idProjet ;
  }

  initForm() {
    this.planForm = this.formBuilder.group({
      dateCreation: ["", Validators.required],
      nbPieces: ["", Validators.required],
      nbChambres: ["", Validators.required],
      nbEtage: ["", Validators.required],
      surface: ["", Validators.required],
      module: ["", Validators.required]
    });
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    const formValue = this.planForm.value;
    this.plan.dateCreation =  formValue.dateCreation ;
    this.plan.nbPieces = formValue.nbPieces ;
    this.plan.nbChambres = formValue.nbChambres ;
    this.plan.nbEtage = formValue.nbEtage;
    this.plan.surface = formValue.surface;
    this.planService.addPlan(this.plan, this.listModules);
  }

  async getModule(): Promise<void> {
    this.modules = await callApiFree("/module", "GET") ;
  }

  addModule(module: Module): void {
    this.listModules.push(module) ;
    this.dataSource.data = this.listModules ;
  }

  deleteModule(module: Module): void {
    const index = this.listModules.indexOf(module) ;
    this.listModules.splice(index, 1) ;
    this.dataSource.data = this.listModules ;
  }
}
