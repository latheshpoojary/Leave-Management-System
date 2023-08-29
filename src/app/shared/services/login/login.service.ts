import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

interface User {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAdmin = false;
  isAuthenticated = false;
  
  constructor(private http: HttpClient) {
    
   }


  login(email: string, password: string) {
    return this.http.post<User>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnEP3tGFunKNJ9UUtzZVpcu07cAbdHO4o', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        this.isAuthenticated = true;
        localStorage.setItem("user","this.isAuthenticated")
        
        if (response.email === 'admin@pacewisdom.com') {
          this.isAdmin = true;
          localStorage.setItem("admin","this.isAdmin");
        }
        console.log("Authenticated=",this.isAuthenticated,"Admin=",this.isAdmin,);       
      }
      ),
      catchError(this.errorHandler)  
    )
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




