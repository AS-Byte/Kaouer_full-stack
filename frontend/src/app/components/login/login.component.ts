import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  :host ::ng-deep .p-password input {
      width: 100%;
      padding:1rem;
  }
  :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
  :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]
})
export class LoginComponent implements OnInit {
 msg!:"error";
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  constructor(private router:Router,private s:AuthService) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      
      password: new FormControl('', [Validators.required])
    });
  }
  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return alert("please introduce your data");
      
    }
    this.s.loginAdmin(this.loginForm.value).subscribe((response: any) => {
        // set the token in the localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        // redirect to dashboard
        this.router.navigateByUrl('/dashboard');
      },
      (error: any)=>{
        console.log(error);
     
        if (error.status === 404) {
          // this.toasterService.pop('error', 'Veuillez vérifier votre e-mail ou votre mot de passe!', error.error.message);
        alert("cannot get!!")
        }
      });
  }
  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }
}
  

