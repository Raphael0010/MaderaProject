import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Logout, GetUsername } from "../../core/Connexion";
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  username: string;
  constructor(private router: Router) {}

  ngOnInit() {
    this.username = GetUsername();
  }
  logout() {
    Logout();
    this.router.navigateByUrl("/login");
  }
}
