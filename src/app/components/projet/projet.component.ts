import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { callApiFree } from "src/app/core/ApiCall";
import { Projet } from "src/app/models/projet.model";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-projet",
  templateUrl: "./projet.component.html",
  styleUrls: ["./projet.component.css"]
})
export class ProjetComponent implements OnInit {

  projets: Projet[] = [] ;
  displayedColumns: string[] = ["nomProjet", "client", "dateCreation"];
  dataSource ;

  constructor() { }

  async ngOnInit() {
    this.projets = await callApiFree("/testBDD", "GET");
    this.dataSource = new MatTableDataSource(this.projets);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
