import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { callApiFree } from "src/app/core/ApiCall";
import { Client } from "src/app/models/client.model";
import { ClientService } from "src/app/services/client.service";
import { MatDialog } from "@angular/material";
import { DialogDeleteComponent } from "src/app/shared/dialog-delete/dialog-delete.component";
import { AddClientDialogComponent } from "./dialog/add-client-dialog/add-client-dialog.component";
import { EditClientDialogComponent } from "./dialog/edit-client-dialog/edit-client-dialog.component";
import { Identifiers } from "@angular/compiler/src/render3/r3_identifiers";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.css"]
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  client: Client;

  displayedColumns: string[] = [
    "id",
    "nom",
    "prenom",
    "mail",
    "tel",
    "newsletter",
    "buttons"
  ];
  dataSource;

  constructor(private clientService: ClientService, public dialog: MatDialog) {}

  async ngOnInit() {
    this.clients = await this.clientService.getAllClients();
    this.dataSource = new MatTableDataSource(this.clients);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewClient() {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      height: "400px",
      width: "600px",
      data: { client: this.client }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === 1) {
        this.clients = await this.clientService.getAllClients();
        this.dataSource = new MatTableDataSource(this.clients);
      }
    });
  }

  editClient(client: Client) {
    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      height: "400px",
      width: "600px",
      // tslint:disable-next-line:object-literal-shorthand
      data: { client: client }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === 1) {
        this.clients = await this.clientService.getAllClients();
        this.dataSource = new MatTableDataSource(this.clients);
      }
    });
  }

  deleteClient(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: "320px"
    });
    dialogRef.afterClosed().subscribe(async e => {
      if (e === true) {
        this.clients = await this.clientService.getAllClients();
        this.dataSource = new MatTableDataSource(this.clients);
      }
    });
  }
}
