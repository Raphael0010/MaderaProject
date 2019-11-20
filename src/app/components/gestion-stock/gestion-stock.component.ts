import { Component, OnInit } from "@angular/core";
import { callApiFree } from "src/app/core/ApiCall";
import { Stock } from "../../models/stocks.model";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { DialogDeleteComponent } from "src/app/shared/dialog-delete/dialog-delete.component";

@Component({
  selector: "app-gestion-stock",
  templateUrl: "./gestion-stock.component.html",
  styleUrls: ["./gestion-stock.component.css"]
})
export class GestionStockComponent implements OnInit {

  dcStock: string[] = ["composant", "fournisseur", "quantity"];

  dsStock: MatTableDataSource<Stock>;
  stock: Stock[] = [];

  constructor(public dialog: MatDialog) {
    this.dsStock = new MatTableDataSource<Stock>();
  }

  async ngOnInit() {
    this.stock = await callApiFree("/listStocks", "get");
    this.dsStock.data = this.stock;
  }

}
