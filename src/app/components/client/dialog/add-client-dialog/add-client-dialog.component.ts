import { Component, OnInit, Inject } from "@angular/core";
import { Client } from "src/app/models/client.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ClientService } from "src/app/services/client.service";
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';

@Component({
  selector: "app-add-client-dialog",
  templateUrl: "./add-client-dialog.component.html",
  styleUrls: ["./add-client-dialog.component.css"],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: "fr"}
  ],
})
export class AddClientDialogComponent implements OnInit {

  clientForm: FormGroup ;
  client: Client = new Client();
  

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddClientDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Client, private clientService: ClientService, private adapter: DateAdapter<any>) {
    this.adapter.setLocale("fr");
  }

  ngOnInit() {
    this.initForm() ;
  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      mail: ["", Validators.required],
      tel: ["", Validators.required],
      newsletter: ["", Validators.required],
    });
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    const formValue = this.clientForm.value;
    this.client.nom =  formValue.nom ;
    this.client.prenom = formValue.prenom ;
    this.client.mail = formValue.mail ;
    this.client.tel = formValue.tel;
    this.client.newsletter = formValue.newsletter ;
    this.clientService.addClient(this.client);
  }
}
