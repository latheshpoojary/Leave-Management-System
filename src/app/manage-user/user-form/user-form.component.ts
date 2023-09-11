import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { UserComponent } from '../user/user.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRouteSnapshot,CanDeactivateFn,Router,RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { passwordValidator } from 'src/app/shared/validator/password.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  hide=true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private userService: UserService,  private ref: DialogRef<UserComponent>,private _snackBar: MatSnackBar) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password:['' ,[Validators.required,passwordValidator.passwordShouldMatch]]
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
          this._snackBar.open("User Updated Successfully 🎉","close",{
            duration:2000
          });

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
          this._snackBar.open("User Added Successfully 🎉","close",{
            duration:2000
          });

          this.closePopUp();
        },
          error => {
            this._snackBar.open(error,"close")
            console.log(error);
            this.closePopUp();

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
      this.userForm.patchValue({
        name: response['name'],
        designation: response['designation'],
        role: response['role'],
        email: response['email'],
        password: response['password'],
        confirm_password:response['password']

      })
    })
  }


  
}


