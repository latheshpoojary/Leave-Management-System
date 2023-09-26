import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { of } from 'rxjs';

describe('LoginComponent Component ', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: jasmine.SpyObj<LoginService>;
  beforeEach(() => {
    service = jasmine.createSpyObj('LoginService', ['login', 'sayHello']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatFormFieldModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers: [
        {
          provide: LoginService,
          useValue: service,
        },
      ],
      teardown: { destroyAfterEach: false },
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });
  it('to Match ', () => {
    expect('my string').toMatch(/String/i);
  });

  it('should create service instance', () => {
    expect(service).toBeInstanceOf(LoginService);
  });
  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service method', () => {
    const credentials = {
      email: 'lathesh@gmail.com',
      password: 'hello123',
    };
    component.userForm.setValue(credentials);
    const spy = service.login.and.returnValue(of(true));
    // of(true);

    component.onSubmit();

    // expect(service).toBeInstanceOf(LoginService);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledOnceWith(
      credentials.email,
      credentials.password
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should create a form with 2 fields', () => {
    const result = component.userForm.contains('email');
    const result2 = component.userForm.contains('password');
    expect(result).toBeTruthy();
    expect(result2).toBeTruthy();
  });

  it('should make the name control required', () => {
    const control = component.userForm.get('email');

    // control?.setValue('lathesh@gmail.com');
    control?.setValue(''); //false result
    // control?.setValue('lathesh'); //false result

    expect(control?.valid).toBe(false);
  });

  it('should make the password control required', () => {
    const control = component.userForm.get('password');

    control?.setValue('lathesh@gmail.com');
    // control?.setValue(''); //false result
    // control?.setValue('lathesh'); //false result

    expect(control?.valid).toBe(true);
  });

  it('should call the getter method of the form', () => {
    const spy = spyOnProperty(component, 'form', 'get').and.returnValue({
      control: new FormControl(),
    });
    component.form;
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
