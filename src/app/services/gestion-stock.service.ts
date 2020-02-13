import { Injectable } from '@angular/core';
import { Stock } from "../models/stocks.model";
import { callApiFree } from "../core/ApiCall";

@Injectable({
  providedIn: 'root'
})
export class GestionStockService {
  stock: Stock[] = [];
  fournisseurs= [];

  constructor() { }
  async getAllStocks() {
    this.stock = await callApiFree("/listStocks", "GET");
    return this.stock;
  }
  async getAllFournisseurs(){
    this.fournisseurs = await callApiFree("/listFournisseurs", "GET");
    return this.fournisseurs;
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
  async addComposant(composant:string,famille:string, fournisseur:string, unite:string){
    console.log(composant) ;
    console.log(fournisseur) ;
    console.log(famille);
    const data = {
      composant: composant,
      famille: famille,
      fournisseur: fournisseur,
      unite:unite
    };
    const add = await callApiFree("/fournir", "POST", data);
  }
  async addFournisseur(nom:string, mail:string, tel:string){
    console.log(mail) ;
    console.log(nom) ;
    console.log(tel);
    const data = {
      nom: nom,
      tel: tel,
      mail: mail
    };
    const add = await callApiFree("/fournisseur", "POST", data);
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
