import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { ChampionnatComponent } from './championnat/championnat.component';
import { EquipesComponent } from './equipes/equipes.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { TerrainsComponent } from './terrains/terrains.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';

const routes: Routes = [
    { path: '', component: NotfoundComponent },
    { path: 'utilisateurs', component: UtilisateursComponent },
    { path: 'terrains', component: TerrainsComponent },
    { path: 'reservations', component: ReservationsComponent },
    { path: 'equipes', component: EquipesComponent },
    { path: 'championnat', component: ChampionnatComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContenuRoutingModule {}
