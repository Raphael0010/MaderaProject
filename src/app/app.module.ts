import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { MaterialModule } from "./material-module";
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { DevisComponent } from "./components/devis/devis.component";
import { DialogDeleteComponent } from "./shared/dialog-delete/dialog-delete.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavBarComponent,
    DevisComponent,
    DialogDeleteComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatTableModule
  ],
  entryComponents: [DialogDeleteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
