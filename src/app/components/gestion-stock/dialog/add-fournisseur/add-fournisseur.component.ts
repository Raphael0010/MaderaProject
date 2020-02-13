import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GestionStockService } from 'src/app/services/gestion-stock.service';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent implements OnInit {
  fournisseurForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddFournisseurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private stockService: GestionStockService) { }

  ngOnInit() {
    this.initForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  initForm() {
    this.fournisseurForm = this.formBuilder.group({
      nom: ["", Validators.required],
      mail: ["", Validators.email],
      tel: ["", Validators.pattern('[0-9]')]
    });
  }
  confirmEdit(): void {
    const formValue = this.fournisseurForm.value;

    this.stockService.addFournisseur(formValue.nom,formValue.mail,formValue.tel);
  }
}
