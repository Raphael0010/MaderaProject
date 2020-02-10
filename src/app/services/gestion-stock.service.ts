import { Injectable } from '@angular/core';
import { Stock } from "../models/stocks.model";
import { callApiFree } from "../core/ApiCall";

@Injectable({
  providedIn: 'root'
})
export class GestionStockService {
  stock: Stock[] = [];

  constructor() { }
  async getAllStocks() {
    this.stock = await callApiFree("/listStocks", "GET");
    return this.stock;
  }
  async addStock(stock:Stock){
    console.log(stock.id) ;
    console.log(stock.quantity) ;
    const data = {
      id: stock.id,
      quantity: stock.quantity
    };
    const add = await callApiFree("/stock", "POST", data);
  }
  async editStock(stock: Stock) {
    console.log(stock) ;
    const data = {
      id: stock.id,
      composant: stock.composant,
      quantity: stock.quantity
    };
    const add = await callApiFree("/edit/stock/" + stock.id, "POST", data);
  }
  async deleteStock(idStock: number) {
    console.log(idStock);
    const data = {
      id: idStock
    };
    const edit = await callApiFree("/delete/stock", "POST", data);
  }
}
