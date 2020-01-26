import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { Plan } from "src/app/models/plan.model";
import { PlanService } from "src/app/services/plan.service";
import { AddPlanDialogComponent } from "./dialog/add-plan-dialog/add-plan-dialog/add-plan-dialog.component";
import { EditPlanDialogComponent } from "./dialog/edit-plan-dialog/edit-plan-dialog/edit-plan-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Module } from "src/app/models/module.model";

@Component({
  selector: "app-plan",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.css"]
})
export class PlanComponent implements OnInit {
  plans: Plan[];
  modules: Module[];
  plan: Plan;
  idProjet = 0;
  count = 0;

  displayedColumns: string[] = [
    "dateCreation",
    "nbPieces",
    "nbChambres",
    "nbEtage",
    "surface",
    "modules",
    "buttons"
  ];
  dataSource: MatTableDataSource<Plan>;

  constructor(
    public dialog: MatDialog,
    private planService: PlanService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Plan>();
  }

  ngOnInit() {
    this.idProjet = parseInt(this.route.snapshot.params.id, 10);
    this.getPlanById();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showDevis(id: number) {
    this.router.navigate([`/devis/${id}`]);
  }

  addNewPlan() {
    const dialogRef = this.dialog.open(AddPlanDialogComponent, {
      height: "800px",
      width: "600px",
      data: { idProjet: this.idProjet }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === 1) {
        this.plans = await this.planService.getPlanById(this.idProjet);
        if (this.plans.length === 1) {
          this.count = 1;
        }
        this.dataSource.data = this.plans;
      }
    });
  }

  editPlan(
    id: number,
    dateCreation: Date,
    nbPieces: number,
    nbChambres: number,
    nbEtage: number,
    surface: number
  ) {
    const dialogRef = this.dialog.open(EditPlanDialogComponent, {
      height: "800px",
      width: "600px",
      // tslint:disable-next-line:object-literal-shorthand
      data: {
        id,
        dateCreation,
        nbPieces,
        nbChambres,
        nbEtage,
        surface
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getPlanById() ;
        this.dataSource.data = this.plans;
      }
    });
  }

  async deletePlan(id: number) {
    await this.planService.deletePlan(id) ;
    this.plans = await this.planService.getPlanById(this.idProjet) ;
    this.dataSource.data = this.plans;
    this.count = 0 ;
  }

  async getPlanById() {
    this.plans = await this.planService.getPlanById(this.idProjet);
    if (this.plans.length === 1) {
      this.count = 1 ;
      this.dataSource.data = this.plans;
      this.getModulesByPlan();
    }
  }

  async getModulesByPlan() {
    this.modules = await this.planService.getModulesByPlan(this.plans[0]);
  }
}
