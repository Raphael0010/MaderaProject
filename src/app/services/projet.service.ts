import { Injectable } from "@angular/core";
import { Projet } from "../models/projet.model";
import { callApiFree } from "../core/ApiCall";

@Injectable({
  providedIn: "root"
})
export class ProjetService {
  projets: Projet[] = [];

  constructor() {}

  async addProjet(projet: Projet): Promise<void> {
    const data = {
      nom: projet.nom,
      client: projet.idClient,
      date : projet.dateCreation,
      nom_comm: localStorage.getItem("username")
    } ;
    const add = await callApiFree("/projet", "POST", data) ;
  }

  async getAllProjets(): Promise<Projet[]> {
    this.projets = await callApiFree("/projet", "GET");
    return this.projets;
  }

  async editProjet(projet: Projet): Promise<void> {
    const data = {
      id: projet.id,
      nom: projet.nom,
      client: projet.idClient,
      date: projet.dateCreation,
      nom_comm: localStorage.getItem("username")
    };
    const edit = await callApiFree("/edit/projet", "POST", data);
  }

  async deleteProjet(idProjet: number): Promise<void> {
    const data = {
      id: idProjet
    };
    const deleted = await callApiFree("/delete/projet", "POST", data);
  }
}
