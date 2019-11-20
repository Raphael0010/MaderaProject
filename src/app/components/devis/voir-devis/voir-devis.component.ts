import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-voir-devis",
  templateUrl: "./voir-devis.component.html",
  styleUrls: ["./voir-devis.component.css"]
})
export class VoirDevisComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.params.id, 10);
  }
}
