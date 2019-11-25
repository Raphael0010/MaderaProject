import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Stock } from 'src/app/models/stocks.model';
import { GestionStockService } from 'src/app/services/gestion-stock.service'
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-edit-stock-dialog',
  templateUrl: './edit-stock-dialog.component.html',
  styleUrls: ['./edit-stock-dialog.component.css']
})
export class EditStockDialogComponent implements OnInit {
  stockForm: FormGroup;
  stock: Stock = new Stock();

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private stockService: GestionStockService) {

  }

  ngOnInit() {
    this.initForm() ;
    this.stock.id = this.data.id;
  }

  initForm() {
    this.stockForm = this.formBuilder.group({
      composant: [this.data.stock.composant],
      quantity: [this.data.stock.quantity]
    });
  }

}
