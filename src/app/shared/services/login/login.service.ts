import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, mergeMap, of, switchMap, tap, throwError } from 'rxjs';

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
  isAuthenticated = '';
  userKey!:string;

  constructor(private http: HttpClient) {

  }


  // login(email: string, password: string) {
  //   console.log("Login initiated");
    
  //   return this.http.post<User>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnEP3tGFunKNJ9UUtzZVpcu07cAbdHO4o', {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   }).pipe(
  //     tap(response => {

        
  //       if (response.email === 'admin@pacewisdom.com') {
  //         this.isAdmin = true;
  //         localStorage.setItem("admin", "this.isAdmin");
  //       }
  //       else {
  //          this.getUser(response.localId).subscribe(response=>{

  //          },
  //           err=>{
  //             console.log("here");
              
  //             throw Error(err.message)
 
  //           })
  //          }
  //         }
  //       )
  //   ) }

  // getUser(localId: string) {
  //   return this.http.get('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user/' + localId + '.json')
  //     .pipe(
  //       tap((response:any)=>{
  //         if(!response.isDeleted){
  //           localStorage.setItem("userId",response.id);
  //         }
  //         throwError(()=>{
  //           "User not Found"
  //         })
  //       }),
  //        // Convert response to a boolean
  //     );

  // }

  login(email: string, password: string) {
    console.log("Login initiated");
  
    return this.http.post<User>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnEP3tGFunKNJ9UUtzZVpcu07cAbdHO4o', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      switchMap(authResponse => {
        if (authResponse.email === 'admin@pacewisdom.com') {
          this.isAdmin = true;
          localStorage.setItem("admin", "this.isAdmin");
          return of(authResponse); // Continue with the admin user
        } else {
          return this.getUser(authResponse.localId).pipe(
            catchError(err => {
              return throwError({
                error:{
                  error:{
                    message:"USER_NOT_FOUND"
                  }
                }
              });
            }),
            map((response) => {
              console.log("response",response);
              localStorage.setItem("user", authResponse.localId);
              return response
            }
            ) // Continue with the regular user
          );
        }
      }),
      catchError(this.errorHandler)

    );
  }
  
  getUser(localId: string) {
    return this.http.get('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user/' + localId + '.json').pipe(
      tap((response: any) => {
        if (response.isDeleted) {
          
          throw new Error("User is deleted");
        } else {
          localStorage.setItem("userId",response.id);
          return true;
        }
      })
    );
  }
  

  errorHandler(errorRes: HttpErrorResponse) {
    console.log(errorRes, "From ErrorHandler");

    let errorMessage = "UnKnown Error Occurred";
    if (!errorRes.error || !errorRes.error.error) {
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
      case 'USER_NOT_FOUND':
        errorMessage = "User Account Deleted";
        break;
      default:
        errorMessage = "Unknown Error"; // Set a default message for unmatched cases
    }
    return throwError(errorMessage);
  }

}




