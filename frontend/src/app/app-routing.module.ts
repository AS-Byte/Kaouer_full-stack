import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TerrainEditComponent} from "./components/terrain/terrain-edit/terrain-edit.component";
import {TerrainCreateComponent} from "./components/terrain/terrain-create/terrain-create.component";
import {TerrainListComponent} from "./components/terrain/terrain-list/terrain-list.component";
import {CentreCreateComponent} from "./components/centre/centre-create/centre-create.component";
import {CentreListComponent} from "./components/centre/centre-list/centre-list.component";



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'terrains-list' },
  { path: 'create-terrain', component: TerrainCreateComponent },
  { path: 'edit-terrain/:id', component: TerrainEditComponent },
  { path: 'terrains-list', component: TerrainListComponent },
  { path: 'create-centre', component: CentreCreateComponent },
  { path: 'edit-centre/:id', component: CentreCreateComponent },
  { path: 'centres-list', component: CentreListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
