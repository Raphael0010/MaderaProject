import { Component, OnInit } from "@angular/core";
import { callApiFree } from "src/app/core/ApiCall";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "src/app/shared/snack-bar/snack-bar.component";

@Component({
  selector: "app-voir-devis",
  templateUrl: "./voir-devis.component.html",
  styleUrls: ["./voir-devis.component.css"]
})
export class VoirDevisComponent implements OnInit {
  id: number;
  devis: any = undefined;
  plan: any = undefined;
  montant: number = 0;
  remise: number = 0;

  constructor(private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

  async ngOnInit() {
    this.id = parseInt(this.route.snapshot.params.id, 10);
    this.devis = (await callApiFree(`/devis/${this.id}`, "get"))[0];
    if (!this.devis) {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 5 * 1000,
        data: "Ce devis n'existe pas"
      });
    } else {
      this.plan = await callApiFree(`/planDevis/${this.devis.id_plan}`, "get");
      this.montant = this.plan.reduce((c, p) => c + p.PUHT, 0);
      this.remise = this.devis.remise_percent;
    }
  }
}
