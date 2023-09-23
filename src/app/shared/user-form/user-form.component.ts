import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { UserComponent } from '../../manage-user/user/user.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { passwordValidator } from 'src/app/shared/validator/password.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  hide = true;
  hide2 = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    readonly fb: FormBuilder,
    readonly userService: UserService,
    readonly ref: MatDialogRef<UserComponent>,
    readonly _snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      role: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9\\.]{1,}@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'),
        ],
      ],
      password: ['', Validators.required],
      confirm_password: [
        '',
        [Validators.required, passwordValidator.passwordShouldMatch],
      ],
    });
  }

  ngOnInit(): void {
    if (this.data.key) {
      //getting edit key
      console.log(this.data.key, 'key here');

      this.setFormData(this.data.key);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      //only perform action if form is valid
      const email = this.userForm.value.email;
      const password = this.userForm.value.password;
      if (this.data.key) {
        //edit when edit key exist
        this.userService
          .editEmployee(this.data.key, this.userForm.value)
          .subscribe({
            next: () => {
              this._snackBar.open('✅  User Updated Successfully', '❌', {
                duration: 2000,
              });
              this.ref.close('success');
            },
            error: () => {
              this._snackBar.open('something went wrong 🤔', '❌', {
                duration: 2000,
              });
            },
          });
      } else {
        this.userService
          .addEmployee(email, password, this.userForm.value)
          .subscribe({
            next:() => {
              this._snackBar.open('✅  User Added Successfully', '❌', {
                duration: 2000,
              });
              this.ref.close('success');
            },
            error:error => {
              this._snackBar.open(error, '❌',{
                duration:2000
              });
              this.ref.close(false);
            }
          }
           
          );
      }
    }
  }

  //closing pop up
  //editing form data
  setFormData(key: string) {
    this.userService.getEmployeeByKey(key).subscribe((response: any) => {
      this.userForm.patchValue({
        name: response['name'],
        designation: response['designation'],
        role: response['role'],
        email: response['email'],
        password: response['password'],
        confirm_password: response['password'],
      });
    });
  }
}
