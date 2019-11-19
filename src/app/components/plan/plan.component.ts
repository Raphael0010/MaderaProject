import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Projet } from "src/app/models/projet.model";
import { MatDialog } from "@angular/material/dialog";
import { ProjetService } from "src/app/services/projet.service";
import { Plan } from "src/app/models/plan.model";
import { PlanService } from "src/app/services/plan.service";
import { AddPlanDialogComponent } from "./dialog/add-plan-dialog/add-plan-dialog/add-plan-dialog.component";
import { EditPlanDialogComponent } from "./dialog/edit-plan-dialog/edit-plan-dialog/edit-plan-dialog.component";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: "app-plan",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.css"]
})
export class PlanComponent implements OnInit {

  plans: Plan[] ;
  plan: Plan ;
  id = 0 ;
  count = 0 ;

  displayedColumns: string[] = ["dateCreation", "nbPieces", "nbChambres", "nbEtage", "surface", "buttons"];
  dataSource ;

  constructor(public dialog: MatDialog, private planService: PlanService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.plans = await this.planService.getPlanById(this.id) ;
    this.dataSource = new MatTableDataSource(this.plans);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewPlan() {
    const dialogRef = this.dialog.open(AddPlanDialogComponent, {
      height: "400px",
      width: "600px",
      data: {plan: this.plan, id: this.id}
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === 1) {
        this.plans = await this.planService.getPlanById(this.id) ;
        this.dataSource = new MatTableDataSource(this.plans);
      }
    });
  }

  editProject(id: number, dateCreation: Date, nbPieces: number, nbChambres: number, nbEtage: number, surface: number) {
    const dialogRef = this.dialog.open(EditPlanDialogComponent, {
      height: "400px",
      width: "600px",
      // tslint:disable-next-line:object-literal-shorthand
      data: {id: id, dateCreation: dateCreation, nbPieces: nbPieces, nbChambres: nbChambres, nbEtage: nbEtage, surface: surface }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === 1) {
        this.plans = await this.planService.getPlanById(this.id) ;
        this.dataSource = new MatTableDataSource(this.plans);
      }
    });
  }

  async deleteProjet(id: number) {
    await this.planService.deletePlan(id) ;
    this.plans = await this.planService.getPlanById(this.id) ;
    this.dataSource = new MatTableDataSource(this.plans);
  }



}
