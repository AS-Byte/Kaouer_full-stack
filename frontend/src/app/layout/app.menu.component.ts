import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Accueil',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],
                    },
                ],
            },
            {
                label: 'Modules',
                items: [
                    {
                        label: 'Utilisateurs',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/contenu/utilisateurs'],
                    },
                    {
                        label: 'Terrains',
                        icon: 'pi pi-fw pi-map-marker',
                        routerLink: ['/contenu/terrains'],
                    },
                    {
                        label: 'Réservations',
                        icon: 'pi pi-fw pi-ticket',
                        routerLink: ['/contenu/reservations'],
                    },
                    {
                        label: 'Équipes',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/contenu/equipes'],
                    },
                    {
                        label: 'Championnat',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/contenu/championnat'],
                    },
                ],
            },
        ];
    }
}
