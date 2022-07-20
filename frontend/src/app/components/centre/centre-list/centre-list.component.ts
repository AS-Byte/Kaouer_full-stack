import { Component, OnInit } from '@angular/core';
import {Centre} from "../../../model/Centre";
import {ApiService} from "../../../service/api.service";
import {Terrain} from "../../../model/Terrain";

@Component({
  selector: 'app-centre-list',
  templateUrl: './centre-list.component.html',
  styleUrls: ['./centre-list.component.css']
})
export class CentreListComponent implements OnInit {
  Centre : Centre[];
  searchTerm: string;
  page = 1;
  pageSize = 8;
  collectionSize: number;
  currentRate = 2;
  terrainFoot:Centre;
  centers : Centre[];
  allCentre:Centre[];
  listTerrain:Terrain[];

  constructor(private apiService: ApiService) {
    this.readCentre()
  }

  ngOnInit(): void {
  }
  readCentre() {
    this.apiService.getCentres().subscribe((data:Centre[]) => {

      this.collectionSize = data.length;
      this.centers=data;
      console.log(this.centers);
      this.allCentre = this.centers;
    });
  }
  idsForeachPage(i:number):Number{
    return(this.page -1) * this.pageSize + i + 1
  }
  removeCentre(centre_id) {
    console.log(centre_id)
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteCentre(centre_id).subscribe((data) => {
        this.readCentre();
      });

    }
  }
}
