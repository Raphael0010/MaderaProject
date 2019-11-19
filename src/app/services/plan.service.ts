import { Injectable } from "@angular/core";
import { Plan } from "../models/plan.model";
import { callApiFree } from "../core/ApiCall";

@Injectable({
  providedIn: "root"
})
export class PlanService {

  plans: Plan[] = [];

  constructor() { }

  async addPlan(plan: Plan) {
    const data = {
      id: plan.id,
      dateCreation: plan.dateCreation,
      nbPieces: plan.nbPieces,
      nbChambres: plan.nbChambres,
      nbEtage: plan.nbEtage,
      surface: plan.surface
    } ;
    const add = await callApiFree("/plan", "POST", data) ;
  }

  async getPlanById(id: number) {
    this.plans = await callApiFree("/plan/" + id, "GET");
    return this.plans ;
  }

  async editPlan(plan: Plan) {
    console.log(plan) ;
    const data = {
      id: plan.id,
      dateCreation: plan.dateCreation,
      nbPieces: plan.nbPieces,
      nbChambres: plan.nbChambres,
      nbEtage: plan.nbEtage,
      surface: plan.surface
    } ;
    const edit = await callApiFree("/edit/plan", "POST", data) ;
    console.log(edit) ;
  }

  async deletePlan(idPlan: number) {
    console.log(idPlan) ;
    const data = {
      id: idPlan
    } ;
    const edit = await callApiFree("/delete/plan", "POST", data) ;
  }
}
