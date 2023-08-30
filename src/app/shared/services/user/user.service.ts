import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

interface User {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

export interface UserDetails{
  id:string,
  name:string,
  designation:string,
  role:string,
  email:string,

}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  addEmployee(email: string, password: string) {
    return this.http.post<User>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnEP3tGFunKNJ9UUtzZVpcu07cAbdHO4o', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.errorHandler) 
    )
  }

  addEmployeeRealTime(user:any){
    console.log(user);
    
    return this.http.post<UserDetails[]>('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user.json',user);
  }


  getEmployees(){
    return this.http.get<UserDetails[]>('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user.json');
  }


  errorHandler(errorRes: HttpErrorResponse){
    console.log(errorRes,"From ErrorHandler");
    
    let errorMessage = "UnKnown Error Occurred";
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    } 
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = "Email Not Found"
        break;
      case 'INVALID_EMAIL':
        errorMessage = "Email Not Exist";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "Password is Invalid";
        break;
      case 'USER_DISABLED':
        errorMessage = "Admin Restrict this Account";
        break;
      default:
        errorMessage = "Unknown Error"; // Set a default message for unmatched cases
    }
    return throwError(errorMessage);
  }
  

}
