import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { DevisComponent } from "./components/devis/devis.component";
import { ProjetComponent } from "./components/projet/projet.component";
import { PlanComponent } from "./components/plan/plan.component";

/**
 * Gestion des routes
 * Faire comme ça : { path: "login", component: LoginComponent },
 * Path = l'url genre /login et component c'est le composant sur lequel on pointe
 */
const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "devis", component: DevisComponent },
  { path: "projet", component: ProjetComponent },
  { path: "plan/:id", component: PlanComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
