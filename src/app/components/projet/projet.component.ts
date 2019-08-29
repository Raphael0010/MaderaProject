import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-projet",
  templateUrl: "./projet.component.html",
  styleUrls: ["./projet.component.css"]
})
export class ProjetComponent implements OnInit {

  displayedColumns: string[] = ["nomProjet", "client", "dateCreation"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
