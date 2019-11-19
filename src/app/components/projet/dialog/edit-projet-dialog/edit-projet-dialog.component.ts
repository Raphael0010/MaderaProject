import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Projet } from "src/app/models/projet.model";
import { ProjetService } from "src/app/services/projet.service";
import {
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS
} from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import * as moment from "moment";

@Component({
  selector: "app-edit-projet-dialog",
  templateUrl: "./edit-projet-dialog.component.html",
  styleUrls: ["./edit-projet-dialog.component.css"],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: "fr" },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class EditProjetDialogComponent implements OnInit {
  projetForm: FormGroup;
  projet: Projet = new Projet();

  clients = [
    {
      id_cli: 1,
      nom: "Prod",
      prenom: "Arthur"
    },
    {
      id_cli: 2,
      nom: "Valjean",
      prenom: "Jean"
    }
  ];
  // tslint:disable-next-line:max-line-length
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProjetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private projetService: ProjetService,
    private adapter: DateAdapter<any>
  ) {
    this.adapter.setLocale("fr");
  }

  ngOnInit() {
    this.initForm();
    this.projet.id = this.data.id;
  }

  initForm() {
    this.projetForm = this.formBuilder.group({
      nomProjet: [this.data.nom, Validators.required],
      client: [this.data.idClient, Validators.required],
      dateCreation: [this.data.dateCreation, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmEdit(): void {
    const formValue = this.projetForm.value;
    this.projet.nom = formValue.nomProjet;
    this.projet.idClient = formValue.client;
    this.projet.dateCreation = formValue.dateCreation;
    this.projetService.editProjet(this.projet);
  }

  /*formatDate(date: Date) {
    const monthNames = [
      "01", "02", "03",
      "04", "05", "06", "07",
      "08", "09", "10",
      "11", "12"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return year + "-" + monthNames[monthIndex] + "-" + day;
  }*/
}
