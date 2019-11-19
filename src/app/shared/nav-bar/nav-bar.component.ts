import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Logout } from "../../core/Connexion";
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent {
  constructor(private router: Router) {}
  logout() {
    Logout();
    this.router.navigate(["/login"]);
  }
}
