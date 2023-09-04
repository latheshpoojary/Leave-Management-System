import { Component } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { LoginService } from '../../shared/services/login/login.service';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userForm!:FormGroup;
  hide=true; //password hide and show
  constructor(private fb:FormBuilder,private loginService:LoginService,private _snackBar: MatSnackBar,private route:Router){
    this.userForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }


  // get the form control for template
  get form(){
    return this.userForm.controls;
  }

  // submitting form
  onSubmit(){
    if(this.userForm.invalid){ 
      return;                  //additional checking for unusual login
    }

    //getting email and password for authentication
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;

    //call login service
    this.loginService.login(email,password).subscribe((response)=>{
      
      console.log("Response from FireBase",response); 
      this.route.navigate(['dashboard']);
    },
    (error:any)=>{
      this._snackBar.open(error,"Close");  
    }) 
  }
}
