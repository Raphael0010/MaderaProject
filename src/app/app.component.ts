import { Component } from "@angular/core";
import { TestLogin } from "../app/core/Connexion";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  login: boolean;

  testLog(): boolean {
    return TestLogin();
  }
  title = "Madera";
}
