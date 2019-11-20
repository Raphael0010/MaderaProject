import { Component, OnInit, Inject } from "@angular/core";
import { Client } from "src/app/models/client.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ClientService } from "src/app/services/client.service";
import { MAT_DATE_LOCALE, DateAdapter } from "@angular/material/core";

@Component({
  selector: "app-edit-client-dialog",
  templateUrl: "./edit-client-dialog.component.html",
  styleUrls: ["./edit-client-dialog.component.css"],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: "fr" }
  ]
})
export class EditClientDialogComponent implements OnInit {
  clientForm: FormGroup;
  client: Client = new Client();
  checked = false;

  // tslint:disable-next-line:max-line-length
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private clientService: ClientService,
    private adapter: DateAdapter<any>
  ) {
    this.adapter.setLocale("fr");
  }

  ngOnInit() {
    this.initForm();
    this.client.id_cli = this.data.id_cli;
  }

  initForm() {
    if (this.data.client.newsletter === "1") {
      this.checked = true;
    } else {
      this.checked = false;
    }

    this.clientForm = this.formBuilder.group({
      nom: [this.data.client.nom, Validators.required],
      prenom: [this.data.client.prenom, Validators.required],
      mail: [this.data.client.mail, Validators.required],
      tel: [this.data.client.tel, Validators.required],
      newsletter: [this.checked, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmEdit(): void {
    const formValue = this.clientForm.value;
    this.client.id_cli = this.data.client.id;
    this.client.nom = formValue.nom;
    this.client.prenom = formValue.prenom;
    this.client.mail = formValue.mail;
    this.client.tel = formValue.tel;
    this.client.newsletter = formValue.newsletter;
    this.clientService.editClient(this.client);
  }
}
