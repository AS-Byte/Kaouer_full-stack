import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';
import {UserModel} from "../../../_services/user";
import {UserService} from "../../../_services/user.service";

@Component({
    selector: 'app-utilisateurs',
    templateUrl: './utilisateurs.component.html',
    styleUrls: ['./utilisateurs.component.scss'],
})
export class UtilisateursComponent implements OnInit {

    userValue!:FormGroup;
    userObj:UserModel= new UserModel();
    userList:any=[];
    btnSaveShow:boolean=true;
    btnUpdateShow:boolean=false;
    users = [];
    userCount: number=0;

      constructor(private formBuilder:FormBuilder,private api:UserService
        ,private router:Router) { }

      ngOnInit(): void {
        this.userValue=this.formBuilder.group({
          _id:[],
          username:[''],
          email:[''],
          password:[''],
          phone:['']
        })
        this.getUser();
        this.countUser();
      }
      addUser(){
      this.userObj.username = this.userValue.value.username;
      this.userObj.email = this.userValue.value.email;
      this.userObj.phone = this.userValue.value.phone;
      this.userObj.password= this.userValue.value.password;
      this.showUpdate()
      this.api.postUser(this.userObj).subscribe({next: (v)=>{
        console.log(v)
      },
      error:(e)=>{
        alert("error")
      },
      complete:()=>{
        console.log('complete')
        alert("user added with success")
        this.countUser();
        this.getUser()

        this.userValue.reset()

      }
    })
      }

      getUser(){
        this.api.getUser().subscribe(res=>{
          this.userList= res;
        })
      }


      deleteUser(_id:string){
        this.api.deleteUser(_id).subscribe(res => {
          alert("Record Deleted");
          this.getUser();
        })

      }

      editUser(data:any){
        this.userValue.controls['username'].setValue(data.username)
        this.userValue.controls['email'].setValue(data.email)
        this.userValue.controls['phone'].setValue(data.phone)
        this.userValue.controls['password'].setValue(data.password)
        this.userObj._id=data._id;
        this.showUpdate()

      }
      updateUser(){
      this.userObj.username = this.userValue.value.username;
      this.userObj.email = this.userValue.value.email;
      this.userObj.phone = this.userValue.value.phone;
      this.userObj.password= this.userValue.value.password;
     this.showUpdate()
      this.api.putUser(this.userObj,this.userObj._id).subscribe({next: (v)=>{
        console.log(v)
      },
      error:(e)=>{
        alert("error")
      },
      complete:()=>{
        console.log('complete')
        alert("user updated with success")
        this.getUser()
        this.userValue.reset()
        this.showSave()
        this.userObj._id="0"
      }
    }
    )}

    showSave(){
      this.btnSaveShow=true;
      this.btnUpdateShow=false;
    }
    showUpdate(){
      this.btnSaveShow=false;
      this.btnUpdateShow=true;
    }

    loadUsersCount() {
      this.api.getUserCount().subscribe(
        (d:any) => {
        this.userCount = d;
      });
    }

    countUser(){
      this.api.getUserCount().subscribe(res=>{
        console.log(res.user)
        this.userCount= res.user;
      })

    }
    logout(){
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('role')
      this.router.navigate(['/login'])
    }
}

