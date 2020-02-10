import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Stock } from 'src/app/models/stocks.model';
import { GestionStockService } from 'src/app/services/gestion-stock.service'
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { callApiFree } from "src/app/core/ApiCall";

@Component({
  selector: 'app-add-stock-dialog',
  templateUrl: './add-stock-dialog.component.html',
  styleUrls: ['./add-stock-dialog.component.css']
})
export class AddStockDialogComponent implements OnInit {
  stockForm: FormGroup;
  stock: Stock = new Stock();
  composants = [];

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private stockService: GestionStockService) {

  }

  async ngOnInit() {
    this.initForm();
    this.composants = await callApiFree("/composant", "GET");
    console.log(this.composants);
  }

  initForm() {
    this.stockForm = this.formBuilder.group({
      composant: ["", Validators.required],
      quantity: ["", Validators.required]
    });
  }
  nNoClick(): void {
    this.dialogRef.close();
  }
  async confirmAdd(): Promise<void>{
    const formValue = this.stockForm.value;
    this.stock.quantity = formValue.quantity;
    this.stock.id = formValue.composant;

    await this.stockService.addStock(this.stock);
  }
}
