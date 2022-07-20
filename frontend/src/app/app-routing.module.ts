import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TerrainEditComponent} from "./components/terrain-edit/terrain-edit.component";
import {TerrainCreateComponent} from "./components/terrain-create/terrain-create.component";
import {TerrainListComponent} from "./components/terrain-list/terrain-list.component";



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'terrains-list' },
  { path: 'centre-create-terrain', component: TerrainCreateComponent },
  { path: 'edit-terrain/:id', component: TerrainEditComponent },
  { path: 'terrains-list', component: TerrainListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
