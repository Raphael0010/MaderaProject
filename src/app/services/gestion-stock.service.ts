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
}
