import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Projet } from "src/app/models/projet.model";
import { AddProjetDialogComponent } from "./dialog/add-projet-dialog/add-projet-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ProjetService } from "src/app/services/projet.service";
import { EditProjetDialogComponent } from "./dialog/edit-projet-dialog/edit-projet-dialog.component";
import { Router } from "@angular/router";
import { DialogDeleteComponent } from "src/app/shared/dialog-delete/dialog-delete.component";



@Component({
  selector: "app-projet",
  templateUrl: "./projet.component.html",
  styleUrls: ["./projet.component.css"]
})
export class ProjetComponent implements OnInit {

  projets: Projet[] = [] ;
  projet: Projet ;

  displayedColumns: string[] = ["nomProjet", "client", "dateCreation", "buttons"];
  dataSource ;

  constructor(public dialog: MatDialog, private projetService: ProjetService, private router: Router) { }

  async ngOnInit() {
    this.projets = await this.projetService.getAllProjets() ;
    this.dataSource = new MatTableDataSource(this.projets);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewProject() {
    const dialogRef = this.dialog.open(AddProjetDialogComponent, {
      height: "350px",
      width: "350px",
      data: {projet: this.projet}
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === 1) {
        this.projets = await this.projetService.getAllProjets() ;
        this.dataSource = new MatTableDataSource(this.projets);
      }
    });
  }

  editProject(id: number, nom: string, idClient: number, dateCreation: Date) {
    const dialogRef = this.dialog.open(EditProjetDialogComponent, {
      height: "350px",
      width: "350px",
      // tslint:disable-next-line:object-literal-shorthand
      data: {id: id, idClient: idClient, nom: nom, dateCreation: dateCreation }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === 1) {
        this.projets = await this.projetService.getAllProjets() ;
        this.dataSource = new MatTableDataSource(this.projets);
      }
    });
  }

  async deleteProjet(id: number) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: "320px"
    });
    dialogRef.afterClosed().subscribe(async e => {
      if (e === true) {
        await this.projetService.deleteProjet(id) ;
        this.projets = await this.projetService.getAllProjets() ;
        this.dataSource = new MatTableDataSource(this.projets);
      }
    });
  }

  displayPlan(id: number) {
    this.router.navigate(["/plan/:id"]);
  }



}
