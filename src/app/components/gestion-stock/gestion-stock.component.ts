import { Component, OnInit } from "@angular/core";
import { callApiFree } from "src/app/core/ApiCall";
import { Stock } from "../../models/stocks.model";
import { GestionStockService } from "src/app/services/gestion-stock.service";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { DialogDeleteComponent } from "src/app/shared/dialog-delete/dialog-delete.component";
import { EditStockDialogComponent } from './dialog/edit-stock-dialog/edit-stock-dialog.component';

@Component({
  selector: "app-gestion-stock",
  templateUrl: "./gestion-stock.component.html",
  styleUrls: ["./gestion-stock.component.css"]
})
export class GestionStockComponent implements OnInit {

  dcStock: string[] = ["composant", "fournisseur", "quantity", "buttons"];

  dsStock: MatTableDataSource<Stock>;
  stock: Stock[] = [];

  constructor(private stockService: GestionStockService, public dialog: MatDialog) {
    this.dsStock = new MatTableDataSource<Stock>();
  }

  async ngOnInit() {
    this.stock = await this.stockService.getAllStocks();
    this.dsStock.data = this.stock;
  }
  editStock(stock: Stock) {
    const dialogRef = this.dialog.open(EditStockDialogComponent, {
      height: "400px",
      width: "600px",
      // tslint:disable-next-line:object-literal-shorthand
      data: { stock: stock }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === 1) {
        this.stock = await this.stockService.getAllStocks();
        this.dsStock = new MatTableDataSource(this.stock);
      }
    });
  }
}
