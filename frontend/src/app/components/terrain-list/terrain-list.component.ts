import { Component, OnInit } from '@angular/core';
import { Terrain } from 'src/app/model/Terrain';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-terrain-list',
  templateUrl: './terrain-list.component.html',
  styleUrls: ['./terrain-list.component.css'],
})

export class TerrainListComponent implements OnInit {
  Terrain : Terrain[];
  searchTerm: string;
  page = 1;
  pageSize = 8;
  collectionSize: number;
  currentRate = 2;
  terrainFoot:Terrain;
  terrains : Terrain[];
  allTerrain:Terrain[];

  constructor(private apiService: ApiService) {
    this.readTerrain();
  }

  ngOnInit() {}

  readTerrain() {
    this.apiService.getTerrains().subscribe((data:Terrain[]) => {

        this.collectionSize = data.length;
        this.terrains=data;
        console.log(this.terrains);
        this.allTerrain = this.terrains;
      });
  }
  idsForeachPage(i:number):Number{
    return(this.page -1) * this.pageSize + i + 1
  }
  removeTerrain(terrain_id) {
    console.log(terrain_id)
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteTerrain(terrain_id).subscribe((data) => {
        this.readTerrain();
      });

    }
  }
}
