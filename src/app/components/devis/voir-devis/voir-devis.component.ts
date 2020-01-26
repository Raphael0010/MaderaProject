import { Component, OnInit } from "@angular/core";
import { callApiFree } from "src/app/core/ApiCall";
import { ActivatedRoute } from "@angular/router";

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

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.id = parseInt(this.route.snapshot.params.id, 10);
    this.devis = (await callApiFree(`/devis/${this.id}`, "get"))[0];
    if (!this.devis) {
      //TODO : snackbar devis existe pas
      console.log("vide");
    }
    this.plan = await callApiFree(`/plan/${this.devis.id_plan}`, "get");
    this.montant = this.plan.reduce((c, p) => c + p.PUHT, 0);
  }
}
