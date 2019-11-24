import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { DevisComponent } from "./components/devis/devis.component";
import { ProjetComponent } from "./components/projet/projet.component";
import { PlanComponent } from "./components/plan/plan.component";
import { ClientComponent } from "./components/client/client.component";
import { GestionStockComponent } from "./components/gestion-stock/gestion-stock.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { VoirDevisComponent } from "./components/devis/voir-devis/voir-devis.component";
import { TreeComposantComponent } from './components/plan/tree/tree-composant/tree-composant.component';

/**
 * Gestion des routes
 * Faire comme ça : { path: "login", component: LoginComponent },
 * Path = l'url genre /login et component c'est le composant sur lequel on pointe
 */
const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "stocks",
    canActivate: [AuthGuardService],
    component: GestionStockComponent
  },
  { path: "devis", canActivate: [AuthGuardService], component: DevisComponent },
  {
    path: "devis/:id",
    canActivate: [AuthGuardService],
    component: VoirDevisComponent
  },
  {
    path: "projet",
    canActivate: [AuthGuardService],
    component: ProjetComponent
  },
  {
    path: "plan/:id",
    canActivate: [AuthGuardService],
    component: PlanComponent
  },
  {
    path: "client",
    canActivate: [AuthGuardService],
    component: ClientComponent
  },
  {
    path: "tree",
    component: TreeComposantComponent,
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
