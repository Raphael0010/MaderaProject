import { Injectable } from '@angular/core';
import { Stock } from "../models/stocks.model";
import { callApiFree } from "../core/ApiCall";

@Injectable({
  providedIn: 'root'
})
export class GestionStockService {
  stocks: Stock[] = [];

  constructor() { }
  async getAllStocks() {
    this.stocks = await callApiFree("/listStocks", "GET");
    return this.stocks;
  }

  async editStock(stocks: Stock) {
    const data = {
      id: stocks.id,
      refComposant: stocks.composant,
      quantity: stocks.quantity
    };
    const add = await callApiFree("/edit/stock", "POST", data);
  }
}
