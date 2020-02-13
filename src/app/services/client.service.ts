import { Injectable } from "@angular/core";
import { Client } from "../models/client.model";
import { callApiFree } from "../core/ApiCall";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  clients: Client[] = [];

  constructor() {}

  async addClient(client: Client) {
    const data = {
      id: Math.floor(Math.random() * Math.floor(1000)),
      nom: client.nom,
      prenom: client.prenom,
      mail: client.mail,
      tel: client.tel,
      newsletter: client.newsletter
    };
    await callApiFree("/client", "POST", data);
  }

  async editClient(client: Client) {
    const data = {
      id: client.id_cli,
      nom: client.nom,
      prenom: client.prenom,
      mail: client.mail,
      tel: client.tel,
      newsletter: client.newsletter
    };
    await callApiFree("/edit/client", "POST", data);
  }

  async deleteClient(idClient: number) {
    await callApiFree(`/deleteClient/${idClient}`, "GET");
  }

  async getAllClients() {
    this.clients = await callApiFree("/listClients", "GET");
    return this.clients;
  }
}
