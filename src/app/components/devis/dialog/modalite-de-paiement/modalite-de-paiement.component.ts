import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-modalite-de-paiement",
  templateUrl: "./modalite-de-paiement.component.html",
  styleUrls: ["./modalite-de-paiement.component.css"]
})
export class ModaliteDePaiementComponent implements OnInit {
  dataSource = [];
  displayedColumns: string[] = ["etapes", "somme"];
  constructor(public dialogRef: MatDialogRef<ModaliteDePaiementComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.dataSource = this.data;
  }

  close() {
    this.dialogRef.close();
  }
}
