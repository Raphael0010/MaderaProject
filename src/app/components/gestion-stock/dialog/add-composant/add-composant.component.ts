import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddStockDialogComponent } from '../add-stock-dialog/add-stock-dialog.component';
import { GestionStockService } from 'src/app/services/gestion-stock.service';
import { callApiFree } from 'src/app/core/ApiCall';

@Component({
  selector: 'app-add-composant',
  templateUrl: './add-composant.component.html',
  styleUrls: ['./add-composant.component.css']
})
export class AddComposantComponent implements OnInit {
  fournisseurs: any;
  familles : any;
  fournisseurForm: FormGroup;
  unites = ["ml", "u", "m2", "m3"];

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddComposantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private stockService: GestionStockService) { }

  async ngOnInit() {
    this.initForm();
    this.fournisseurs = await callApiFree("/listFournisseurs", "GET");
    this.familles = await callApiFree("/listFamilles", "GET");
    console.log(this.fournisseurs);
    console.log(this.familles);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  initForm() {
    this.fournisseurForm = this.formBuilder.group({
      composant: ["", Validators.required],
      famille: ["", Validators.required],
      fournisseur: ["", Validators.required],
      unite: ["", Validators.required]
    });
  }
  async confirmAdd(): Promise<void>{
    const formValue = this.fournisseurForm.value;

    await this.stockService.addComposant(formValue.composant,formValue.famille, formValue.fournisseur, formValue.unite);
  }
}
