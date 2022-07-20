import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Create terrain
  createTerrain(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  //Send e-mail centre-create terrain
  /*sendEmailCTerrain(data): Observable<any> {
    let url = `${this.baseUri}/sendmailc/$`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }*/

  // Get all terrains
  getTerrains() {
    return this.http.get(`${this.baseUri}`);
  }
  contact() {
    return this.http.get(`${this.baseUri}/contact`);
  }
  // Get terrain by id
  getTerrain(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update terrain
  updateTerrain(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete terrain
  deleteTerrain(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

////////////////////////
/*   createCentre(data): Observable<any> {
    let url = `${this.baseUri}/centre/centre-create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  getCentres() {
    return this.http.get(`${this.baseUri}/centre`);
  }

  getCentre(id): Observable<any> {
    let url = `${this.baseUri}/centre/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }


  updateCentre(id, data): Observable<any> {
    let url = `${this.baseUri}/centre/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  deleteCentre(id): Observable<any> {
    let url = `${this.baseUri}/centre/delete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }*/

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

  // Get client-side error
      errorMessage = error.error.message;
    } else {

  // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
