import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { callApiFree } from "src/app/core/ApiCall";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm ;
  data: boolean;
  messageError = "";
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: "",
      password: ""
    });
  }

  async onSubmit(userData) {
    this.data = await loginVerif(userData);
    console.log(this.data);
    if (this.data === true) {
      this.router.navigateByUrl("/devis");
    } else {
      this.messageError = "nom d'utilisateur ou mot de passe incorrect";
    }
    this.loginForm.reset();
  }

  ngOnInit() {}

}

async function loginVerif(data: any) {
  return await callApiFree("/loginVerif", "POST", data);
}
