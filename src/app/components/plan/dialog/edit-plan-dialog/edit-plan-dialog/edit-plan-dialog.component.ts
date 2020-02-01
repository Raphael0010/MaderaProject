import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import * as moment from "moment";
import { Plan } from "src/app/models/plan.model";
import { PlanService } from "src/app/services/plan.service";
import { MatTableDataSource } from "@angular/material";
import { Module } from "src/app/models/module.model";
import { callApiFree } from "src/app/core/ApiCall";

@Component({
  selector: "app-edit-plan-dialog",
  templateUrl: "./edit-plan-dialog.component.html",
  styleUrls: ["./edit-plan-dialog.component.css"],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: "fr", },
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }}
  ],
})
export class EditPlanDialogComponent implements OnInit {
  planForm: FormGroup ;
  plan: Plan = new Plan() ;
  dataSource: MatTableDataSource<Module> ;
  displayedColumns: string[] = ["Module", "buttons"];
  listModules: Module[];
  modules: Module[];

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditPlanDialogComponent>, @Inject(MAT_DIALOG_DATA) public data, private planService: PlanService, private adapter: DateAdapter<any>) {
    this.adapter.setLocale("fr");
    this.dataSource = new MatTableDataSource<Module>() ;
   }

  ngOnInit() {
    this.plan.id = this.data.id ;
    this.getModule();
    this.getModulesByPlan();
    this.initForm() ;
  }

  initForm() {
    this.planForm = this.formBuilder.group({
      dateCreation: [this.data.dateCreation, Validators.required],
      nbPieces: [this.data.nbPieces, Validators.required],
      nbChambres: [this.data.nbChambres, Validators.required],
      nbEtage: [this.data.nbEtage, Validators.required],
      surface: [this.data.surface, Validators.required]
    });
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async confirmEdit(): Promise<void> {
    const formValue = this.planForm.value;
    this.plan.dateCreation =  formValue.dateCreation ;
    this.plan.nbPieces = formValue.nbPieces ;
    this.plan.nbChambres = formValue.nbChambres ;
    this.plan.nbEtage = formValue.nbEtage;
    this.plan.surface = formValue.surface;
    await this.planService.editPlan(this.plan, this.listModules);
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

  async getModule(): Promise<void> {
    this.modules = await callApiFree("/module", "GET") ;
  }

  async getModulesByPlan() {
    this.listModules = await this.planService.getModulesByPlan(this.plan);
    this.dataSource.data = this.listModules;
  }

}
