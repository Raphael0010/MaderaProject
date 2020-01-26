import { Component, OnInit } from "@angular/core";
import { callApiFree } from "src/app/core/ApiCall";
import { Devis } from "../../models/devis.models";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { DialogDeleteComponent } from "src/app/shared/dialog-delete/dialog-delete.component";
import { ModaliteDePaiementComponent } from "src/app/components/devis/dialog/modalite-de-paiement/modalite-de-paiement.component";
import { Router } from "@angular/router";

const MODALITE_PAIEMENT = [
  { etapes: "A la signature", somme: "3%" },
  { etapes: "A l'obtention du permis de construire", somme: "10%" },
  { etapes: "A l'ouverture du chantier", somme: "15%" },
  { etapes: "A l'achèvement des fondations", somme: "25%" },
  { etapes: "A l'achèvement des murs", somme: "40%" },
  { etapes: "A la Mise hors d’eau/hors d’air", somme: "75%" },
  { etapes: "A l'achèvement des travaux d’équipement ", somme: "95%" },
  { etapes: "A la remise des clés", somme: "100%" }
];
@Component({
  selector: "app-devis",
  templateUrl: "./devis.component.html",
  styleUrls: ["./devis.component.css"]
})
export class DevisComponent implements OnInit {
  dcDevis: string[] = ["id", "client", "etat", "action"];

  dsDevis: MatTableDataSource<Devis>;
  devis: Devis[] = [];

  constructor(public dialog: MatDialog, private router: Router) {
    this.dsDevis = new MatTableDataSource<Devis>();
  }

  async ngOnInit() {
    await this.loadDevis();
    setInterval(() => this.loadDevis(), 5000);
  }

  imprimer(id: number) {
    return window.print();
  }

  show(id: number) {
    this.router.navigate([`/devis/${id}`]);
  }

  deleteDevis(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: "320px"
    });
    dialogRef.afterClosed().subscribe(async e => {
      if (e === true) {
        await callApiFree(`/deleteDevis/${id}`, "get");
        await this.loadDevis();
      }
    });
  }

  payment() {
    this.dialog.open(ModaliteDePaiementComponent, { data: MODALITE_PAIEMENT });
  }

  async acceptDevis(id: number) {
    await callApiFree(`/devis/accept/${id}`, "get");
    await this.loadDevis();
  }

  async paimentOk(id: number) {
    await callApiFree(`/devis/paye/${id}`, "get");
    await this.loadDevis();
  }
  async loadDevis(): Promise<void> {
    this.devis = await callApiFree("/listDevis", "get");
    this.dsDevis.data = this.devis;
  }
}
