import { Component, OnInit } from "@angular/core";
import { callApiFree } from "../../core/ApiCall";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  post;
  get = "idle";
  constructor() {}

  async ngOnInit() {
    const data = {
      age: 12,
      prenom: "raphael"
    };
    this.post = await callApiFree("/testPost", "POST", data).toString();
    console.log(await callApiFree("/testPost", "POST", data));
    this.get = await callApiFree(`/testGet?id=${3 + 3}`, "GET").toString();
  }
}
