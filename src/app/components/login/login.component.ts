import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { callApiFree } from "src/app/core/ApiCall";
import { Router } from "@angular/router";
import { Login } from "src/app/core/Connexion";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "src/app/shared/snack-bar/snack-bar.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  loginForm;
  data: boolean;
  messageError = "";
  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: "",
      password: ""
    });
  }

  async onSubmit(userData) {
    if (userData.username.trim() === "" || userData.password.trim() === "") {
      return false;
    }
    this.data = await callApiFree("/loginVerif", "POST", userData);
    if (this.data === true) {
      this.router.navigateByUrl("/client");
      Login(userData.username);
    } else {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 5 * 1000,
        data: "Nom d'utilisateur ou mot de passe incorrect ❌"
      });
    }
    this.loginForm.reset();
  }
}
