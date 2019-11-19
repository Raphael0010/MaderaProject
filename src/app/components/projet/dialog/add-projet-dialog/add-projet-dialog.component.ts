import { Component, OnInit, Inject } from "@angular/core";
import { Projet } from "src/app/models/projet.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProjetService } from "src/app/services/projet.service";
import { MAT_DATE_LOCALE, DateAdapter } from "@angular/material/core";
import { callApiFree } from "src/app/core/ApiCall";

@Component({
  selector: "app-add-projet-dialog",
  templateUrl: "./add-projet-dialog.component.html",
  styleUrls: ["./add-projet-dialog.component.css"],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: "fr"}
  ],
})
export class AddProjetDialogComponent implements OnInit {

  projetForm: FormGroup ;
  projet: Projet = new Projet();
  clients = [] ;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddProjetDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Projet, private projetService: ProjetService, private adapter: DateAdapter<any>) {
    this.adapter.setLocale("fr");
  }

  async ngOnInit() {
    this.initForm() ;
    this.clients = await callApiFree("/client", "GET") ;
  }

  initForm() {
    this.projetForm = this.formBuilder.group({
      nomProjet: ["", Validators.required],
      client: ["", Validators.required],
      dateCreation: ["", Validators.required],
    });
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    const formValue = this.projetForm.value;
    this.projet.nom =  formValue.nomProjet ;
    this.projet.idClient = formValue.client ;
    this.projet.dateCreation = formValue.dateCreation ;
    this.projetService.addProjet(this.projet);
  }
}
