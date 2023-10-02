import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserComponent } from 'src/app/manage-user/user/user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ManageUserRoutingModule } from 'src/app/manage-user/manage-user-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../services/user/user.service';
import { of } from 'rxjs';
import { HolidayService } from '../services/holidays/holiday.service';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let formBuilder: FormBuilder;
  let dialog: MatDialogRef<UserComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        CommonModule,
        NoopAnimationsModule,
        ManageUserRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        CdkDrag,
        CdkDragPlaceholder,
        CdkDropList,
      ], // Import ReactiveFormsModule
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: {} }, // Provide a mock for MatDialogRef
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            key: '123abcf3654',
          },
        },
       
      ],
    });
    fixture = TestBed.createComponent(UserFormComponent);
    formBuilder = TestBed.inject(FormBuilder);
    dialog = TestBed.inject(MatDialogRef<UserComponent>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form Validation', () => {
    let nameField: AbstractControl<any, any> | null;
    let designationField: AbstractControl<any, any> | null;
    let roleField: AbstractControl<any, any> | null;
    let emailField: AbstractControl<any, any> | null;
    let passwordField: AbstractControl<any, any> | null;
    let confirmField: AbstractControl<any, any> | null;
    beforeEach(() => {
      nameField = component.userForm.get('name');
      designationField = component.userForm.get('designation');
      roleField = component.userForm.get('role');
      emailField = component.userForm.get('email');
      passwordField = component.userForm.get('password');
      confirmField = component.userForm.get('confirm_password');
    });
    it('should contain the form with 6 fields', () => {
      expect(component.userForm.contains('name')).toBeTrue();
      expect(component.userForm.contains('designation')).toBeTrue();
      expect(component.userForm.contains('role')).toBeTrue();
      expect(component.userForm.contains('email')).toBeTrue();
      expect(component.userForm.contains('password')).toBeTrue();
      expect(component.userForm.contains('confirm_password')).toBeTrue();
    });

    it('should make the all the fields required', () => {
      nameField?.setValue('');
      designationField?.setValue('');
      roleField?.setValue('');
      emailField?.setValue('');
      passwordField?.setValue('');
      confirmField?.setValue('');
      expect(nameField?.valid).toBeFalse();
      expect(designationField?.valid).toBeFalse();
      expect(roleField?.valid).toBeFalse();
      expect(emailField?.valid).toBeFalse();
      expect(passwordField?.valid).toBeFalse();
      expect(confirmField?.valid).toBeFalse();
    });

    it('should handle the email validation', () => {
      emailField?.setValue('abc@com');
      expect(emailField?.hasError('pattern')).toBeTrue();
    });

    it('should handle confirm password should match with password field', () => {
      passwordField?.setValue('12345abc');
      confirmField?.setValue('1235abc');
      expect(confirmField?.valid).toBeFalse();
    });
  });

  describe('ngOnInIt()', () => {
    it('should call the setFormData', () => {
      const setFormDataSpy = spyOn(component, 'setFormData');
      component.ngOnInit();
      expect(setFormDataSpy).toHaveBeenCalled();
    });
    it('should call the setFormData', () => {
      const setFormDataSpy = spyOn(component, 'setFormData');
      component.ngOnInit();
      expect(setFormDataSpy).toHaveBeenCalled();
    });
  });

  
});
