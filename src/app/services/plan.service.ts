import { Injectable } from "@angular/core";
import { Plan } from "../models/plan.model";
import { callApiFree } from "../core/ApiCall";
import { Module } from "../models/module.model";
import { Projet } from "./../models/projet.model";

@Injectable({
  providedIn: "root"
})
export class PlanService {

  plans: Plan[] = [];

  constructor() { }

  async addPlan(plan: Plan, listeModule: any[]) {
    const data = {
      id: plan.id,
      dateCreation: plan.dateCreation,
      nbPieces: plan.nbPieces,
      nbChambres: plan.nbChambres,
      nbEtage: plan.nbEtage,
      surface: plan.surface,
      listModule: listeModule
    };

    const add = await callApiFree("/plan/" + plan.idProjet, "POST", data) ;
  }

  async getPlanById(id: number) {
    this.plans = await callApiFree("/plan/" + id, "GET");
    return this.plans ;
  }

  async editPlan(plan: Plan, modules: Module[]) {
    const data = {
      id: plan.id,
      dateCreation: plan.dateCreation,
      nbPieces: plan.nbPieces,
      nbChambres: plan.nbChambres,
      nbEtage: plan.nbEtage,
      surface: plan.surface,
      modules
    } ;
    const edit = await callApiFree(`/edit/plan/${plan.id}`, "POST", data) ;
  }

  async deletePlan(idPlan: number) {
    const data = {
      id: idPlan
    } ;
    const edit = await callApiFree("/delete/plan", "POST", data) ;
  }

  async getModulesByPlan(plan: Plan) {
    const data = {
      id: plan.id
    };
    const modules = await callApiFree(`/plan/${plan.id}/module`, "GET", data) ;
    return modules;
  }

  async createDevis(plan: Plan, remise: number, montant: number) {
    const projet: Projet = await callApiFree(`/projet/${plan.idProjet}`, "GET" );
    const data = {
      creationDevis: new Date(),
      modificationDevis: new Date(),
      montantTotal: montant,
      remise,
      acceptationDevis: new Date(),
      etat: "EN ATTENTE",
      idClient: projet.idClient,
      idPlan: plan.id
    };
    const idDevis = await callApiFree("/devis/", "POST", data) ;
    return idDevis;
  }

  async updateDevis(plan: Plan, idDevis: number) {
    const update = await callApiFree(`/plan/${plan.id}/devis/${idDevis}`, "POST");
  }
}
