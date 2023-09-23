import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map,  of, switchMap, tap, throwError } from 'rxjs';

interface User {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  isAdmin = false;
  isAuthenticated = '';
  userKey!:string;
  constructor(readonly http: HttpClient) {
  }

  /**
   * send authentication information to the firebase and return response.
   * @param email 
   * @param password 
   * @returns 
   */

  login(email: string, password: string) {
    return this.http.post<User>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnEP3tGFunKNJ9UUtzZVpcu07cAbdHO4o', {
      email,
      password,
      returnSecureToken: true,
    }).pipe(
      switchMap(authResponse => {
        if (authResponse.email === 'admin@pacewisdom.com') {
          this.isAdmin = true;
          localStorage.setItem('admin', 'this.isAdmin');
          localStorage.setItem('userName','Admin');

          return of(authResponse); // Continue with the admin user
        } else {
          return this.getUser(authResponse.localId).pipe(
            catchError(() => {
              return throwError({
                error:{
                  error:{
                    message:'USER_NOT_FOUND',
                  },
                },
              });
            }),
            map(response => {
              localStorage.setItem('user', authResponse.localId);
              return response;
            }
            ) // Continue with the regular user
          );
        }
      }),
      catchError(this.errorHandler)

    );
  }

  /**
   * get the user by there localId form the real time database and store it in localStorage
   * @param localId 
   * @returns 
   */
  
  getUser(localId: string) {
    return this.http.get(`https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user/${  localId  }.json`).pipe(
      tap((response: any) => {
        if (response.isDeleted) {
          throw new Error('User is deleted');
        } else {
          localStorage.setItem('userId',response.id);
          localStorage.setItem('userName',response.name);
          return true;
        }
      })
    );
  }
  
  /**
   * formatting the error message from the firebase.
   * @param errorRes 
   * @returns 
   */

  errorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'UnKnown Error Occurred';
    if (!errorRes.error && !errorRes.error.error) {
      return throwError(()=>new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Found';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'Email Not Exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is Invalid';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Admin Restrict this Account';
        break;
      case 'USER_NOT_FOUND':
        errorMessage = 'User Account Deleted';
        break;
      default:
        errorMessage = 'Unknown Error'; // Set a default message for unmatched cases
    }
    return throwError(()=>new Error(errorMessage));
  }

}




