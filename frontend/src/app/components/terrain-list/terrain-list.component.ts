import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-terrain-list',
  templateUrl: './terrain-list.component.html',
  styleUrls: ['./terrain-list.component.css'],
})

export class TerrainListComponent implements OnInit {
  Terrain: any = [];

  constructor(private apiService: ApiService) {
    this.readTerrain();
  }

  ngOnInit() {}

  readTerrain() {
    this.apiService.getTerrains().subscribe((data) => {
      this.Terrain = data;
    });
  }

  removeTerrain(terrain, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteTerrain(terrain._id).subscribe((data) => {
        this.Terrain.splice(index, 1);
      });
    }
  }
}
