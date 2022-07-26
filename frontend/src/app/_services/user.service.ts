import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {count, User} from "./interface"
@Injectable({
  providedIn: 'root'
})

export class UserService {

  private loggedIn = false;
  private token!: any;

  constructor(private _http:HttpClient ) {


  }
   header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;

  putUser(data:any,id:any){
    return this._http.put<any>("http://localhost:5000/api/users/"+id,data).pipe(
   map(
    (res=>{
      return res
    })))
  }

  postUser(data:any){
    return this._http.post<any>("http://localhost:5000/api/users/register-user",data).pipe(
   map(
    (res=>{
      return res
    })))
  }


  deleteUser(_id:string){
    return this._http.delete<any>(`http://localhost:5000/api/users/${_id}`)

  }

  getUser(){
    return this._http.get<any>("http://localhost:5000/api/users/").pipe(
   map(
    (res=>{
      return res
    })))
  }

  UserById(id:any){
    return this._http.get<any>(`http://localhost:5000/api/users/${id}`).pipe(
   map(
    (res=>{
      return res
    })))
  }
  getProfile():Observable<User>{

    return this._http.get<User>("http://localhost:5000/api/users/profile"+this.header)
  }
  getUserCount():Observable<count>{ {
    return this._http.get<count>("http://localhost:5000/api/users/number");
  }
}
setLoggedIn(loggedIn: boolean, token?: string) {
  this.loggedIn = loggedIn;
  this.token = token;
}
}

