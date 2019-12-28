import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DATE_LOCALE, DateAdapter } from "@angular/material/core";
import { Plan } from "src/app/models/plan.model";
import { PlanService } from "src/app/services/plan.service";
import { callApiFree } from "./../../../../../core/ApiCall";
import { MatTableDataSource } from '@angular/material';

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
  modules: any ;
  familles: any ;
  composants: any ;
  gammes: any ;
  listComposants: any[] = [];
  dataSource: MatTableDataSource<any> ;
  displayedColumns: string[] = ["Composant", "Qte", "buttons"];


  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddPlanDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private planService: PlanService, private adapter: DateAdapter<any>) {
    this.adapter.setLocale("fr");
    this.dataSource = new MatTableDataSource<any>() ;
  }

  async ngOnInit() {
    this.getModule() ;
    this.getFamille() ;
    this.getGamme() ;
    this.getComposant() ;
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
      module: ["", Validators.required],
      famille: ["", Validators.required],
      gamme: ["", Validators.required],
      composant: ["", Validators.required],
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
    this.planService.addPlan(this.plan);
  }

  async getModule(): Promise<void> {
    this.modules = await callApiFree("/module", "GET") ;
  }

  async getFamille(): Promise<void> {
    this.familles = await callApiFree("/famille", "GET") ;
  }

  async getComposant(): Promise<void> {
    this.composants = await callApiFree("/composant", "GET") ;
  }

  async getGamme(): Promise<void> {
    this.gammes = await callApiFree("/gamme", "GET") ;
  }

  async filterByModule(idModule: number): Promise<void> {
    const composantsApi = await callApiFree("/composant", "GET") ;
    const famillesApi = await callApiFree("/famille", "GET") ;
    this.composants = composantsApi.filter(comp => comp.id_module === idModule) ;
    this.familles = famillesApi.filter(fam => this.composants.find(comp => comp.id_fam === fam.id)) ;
  }

  addComposant(composant: any): void {
    this.listComposants.push(composant) ;
    this.dataSource.data = this.listComposants ;
  }

  deleteComposant(composant: any): void {
    const index = this.listComposants.indexOf(composant) ;
    this.listComposants.splice(index, 1) ;
    this.dataSource.data = this.listComposants ;
  }
}
