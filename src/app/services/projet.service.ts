import { Injectable } from "@angular/core";
import { Projet } from "../models/projet.model";
import { callApiFree } from "../core/ApiCall";

@Injectable({
  providedIn: "root"
})
export class ProjetService {

  projets: Projet[] = [] ;

  constructor() { }

  async addProjet(projet: Projet) {
    const data = {
      nom : projet.nom,
      client: projet.idClient,
      date : projet.dateCreation,
      id_comm: 1
    } ;
    const add = await callApiFree("/projet", "POST", data) ;
  }

  async getAllProjets() {
    this.projets = await callApiFree("/projet", "GET");
    return this.projets ;
  }

  async editProjet(projet: Projet) {
    console.log(projet) ;
    const data = {
      id: projet.id,
      nom : projet.nom,
      client: projet.idClient,
      date : projet.dateCreation,
      id_comm : 1
    } ;
    const edit = await callApiFree("/edit/projet", "POST", data) ;
    console.log(edit) ;
  }

  async deleteProjet(idProjet: number) {
    console.log(idProjet) ;
    const data = {
      id: idProjet
    } ;
    const edit = await callApiFree("/delete/projet", "POST", data) ;
  }
}
