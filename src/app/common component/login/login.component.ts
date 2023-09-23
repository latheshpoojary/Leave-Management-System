import { Component } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { LoginService } from '../../shared/services/login/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[
    trigger('fadeIn',[
      state('void',style({opacity:0,transform:'translateY(20px)'})),
      transition('void<=>*',
        animate(1000)
      ),
    ]),
    
  ],
})
export class LoginComponent {

  isLoading = false;
  userForm!:FormGroup;
  //password hide and show
  hide=true; 
  constructor(readonly fb:FormBuilder,readonly loginService:LoginService,readonly _snackBar: MatSnackBar,readonly route:Router){
    this.userForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    });
  }


  /**
   * get  all the form control
   */
  get form(){
    return this.userForm.controls;
  }

 /**
  * handle the form value while submitting
  * @returns null if invalid form
  */
  onSubmit(){
    if(this.userForm.invalid){ 
      return;                  //additional checking for unusual login
    }
    //getting email and password for authentication
    const email = this.userForm.value.email;
const password = this.userForm.value.password;
    //call login service
    this.isLoading = true;
    this.loginService.login(email,password).subscribe(
      {
        next:()=>{ 
          this.isLoading = false;
          this.route.navigate(['dashboard']);
        },
         error:error=>{
          this._snackBar.open(error,'❌',{
            duration:2000,
          });  
        },
      });
  }
}
