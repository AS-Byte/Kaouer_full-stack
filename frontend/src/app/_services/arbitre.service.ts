import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Arbitre } from '../_models/arbitre';


@Injectable({
  providedIn: 'root',
})
export class ArbitreService {
  private API_URL = environment.API_URL + 'arbitre';

  constructor(private http: HttpClient) {}

  getAllArbitre(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  addChampionnat(champ: Arbitre): Observable<any> {
    return this.http.post(this.API_URL + '/create/', champ);
  }
  
  updateChampionnat(atbitre: Arbitre): Observable<any> {
    return this.http.put(
      this.API_URL + '/update/' + Arbitre._id,
      Arbitre
    );
  }


}
