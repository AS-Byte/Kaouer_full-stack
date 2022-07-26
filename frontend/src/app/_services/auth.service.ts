import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from './user';
const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token!: any;

 currentUser = {};
  
 endpoint: string = 'http://localhost:8000/api/user';
 headers = new HttpHeaders().set( 'Authorization', 'Bearer ' + this.getToken() ); 


 
 
 constructor(private http:HttpClient) { }

 clean(): void {
   window.sessionStorage.clear();
 }


 loginUser(data:any){
   return this.http.post("http://localhost:5000/api/users/login-user",data)
   
 }
 


 
 loginAdmin(data:any){
   return this.http.post("http://localhost:5000/api/users/login-admin",data)}  
 registerUser(data:any){
   return this.http.post("http://localhost:5000/api/users/register-user",data)
 }

 getProfile(): Observable<UserModel>{
  
   return  this.http.get<UserModel>("http://localhost:5000/api/users/profile"+this.headers)


 }


 logout(){
   window.localStorage.clear(); // clear all localstorage
  window.localStorage.removeItem("token")
  this.loggedIn.next(false);
 }


 private saveToken(token: string): void {
   localStorage.setItem('token', token);
   this.token = token;
 }

 private getToken(): string {
   if (!this.token) {
     this.token = localStorage.getItem('token');
    
    
   }
   return this.token;
 }
 public saveUser(user: any): void {
   window.sessionStorage.removeItem(USER_KEY);
   window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
 }

 public getUser(): any {
   const user = window.sessionStorage.getItem('token');
   if (user) {
     return JSON.parse(user);
   }

   return {};
 }

 public isLoggedIn(): boolean {
   const user = window.sessionStorage.getItem('token');
   
   if (user) {
     
     return true;
   }

   return false;
 }
}