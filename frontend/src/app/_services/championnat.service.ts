import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Championnat } from '../_models/championnat';

@Injectable({
  providedIn: 'root',
})
export class ChampionnatService {
  private API_URL = environment.API_URL + 'championnat';

  constructor(private http: HttpClient) {}

  getAllChampionnat(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  addChampionnat(champ: Championnat): Observable<any> {
    return this.http.post(this.API_URL + '/create/', champ);
  }
  
  searchChampionnat(champ: Championnat): Observable<any> {
    return this.http.post(this.API_URL + '/rechercher/'+ champ.nom,champ);
  }
  updateChampionnat(championnat: Championnat): Observable<any> {
    return this.http.put(
      this.API_URL + '/update/' + championnat._id,
      championnat
    );
  }

  deleteChampionnat(championnat: Championnat): Observable<any> {
    return this.http.delete(this.API_URL + '/delete/' + championnat._id);
  }
}
