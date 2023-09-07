import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { UserComponent } from '../user/user.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRouteSnapshot,CanDeactivateFn,Router,RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit,OnDestroy {
  userForm!: FormGroup;
  hide=true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private userService: UserService,  private ref: DialogRef<UserFormComponent>) {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

 

  ngOnInit(): void {
    if (this.data.key) { //getting edit key
      this.setFormData(this.data.key);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {   //only perform action if form is valid
      const email = this.userForm.value.email;
      const password = this.userForm.value.password;
      if (this.data.key) {   //edit when edit key exist
        this.userService.editEmployee(this.data.key, this.userForm.value).subscribe(response => {
          console.log(response, "edit Employee response");
          this.closePopUp();
        },
          error => {
            console.log("Error Occurred");
          }
        );
      }
      else {
        this.userService.addEmployee(email, password,this.userForm.value).subscribe(response => {
          console.log(response);
          this.closePopUp();
        },
          error => {
            console.log(error);
          }
        )
      }
    }
  }

  //closing pop up 
  closePopUp() {
    this.ref.close();
  }

  //editing form data
  setFormData(key: string) {
    this.userService.getEmployeeByKey(key).subscribe((response: any) => {
      this.userForm.setValue({
        id: response['id'],
        name: response['name'],
        designation: response['designation'],
        role: response['role'],
        email: response['email'],
        password: response['password']
      })
    })
  }

  ngOnDestroy(): void {
    // this.router.isActive()
    if(this.userForm.invalid){
      if(confirm('You have unsaved changes. Do you really want to leave?')){

      }
    }
    
  }
  
}


