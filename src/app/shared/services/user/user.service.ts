import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  switchMap,
  throwError,
} from 'rxjs';

interface User {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface UserDetails {
  id: string;
  name: string;
  designation: string;
  role: string;
  email: string;
  key: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId$ = new BehaviorSubject<any>(1);
  constructor(private http: HttpClient) {}

  /**
   * send signup authentication information and on successful call addEmployeeRealtime function,send error to handleError method
   * @param email
   * @param password
   * @param formValue
   * @returns
   */
  addEmployee(email: string, password: string, formValue: any) {
    return this.http
      .post<User>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnEP3tGFunKNJ9UUtzZVpcu07cAbdHO4o',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        switchMap((response) => {
          return this.addEmployeeRealTime(formValue, response.localId);
        }),
        catchError(this.errorHandler)
      );
  }

  /**
   * send the user information to the realtimeDatabase
   * @param user
   * @param id
   * @returns
   */
  addEmployeeRealTime(user: any, id: string) {
    return this.http.put<UserDetails[]>(
      'https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user/' +
        id +
        '.json',
      {
        name: user.name,
        designation: user.designation,
        role: user.role,
        email: user.email,
        password: user.password,
        isDeleted: false,
        id: this.userId$.value,
      }
    );
  }

  /**
   * gives all the employee who are not deleted
   * @returns
   */
  getAllEmployees(): Observable<any> {
    return this.http
      .get(
        'https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user.json'
      )
      .pipe(
        map((employee: any) => {
          const dataArray = Object.keys(employee).map((key) => {
            if (!employee[key].isDeleted) {
              return {
                key: key,
                ...employee[key],
              };
            } else {
              return null;
            }
          });
          return dataArray.filter((item) => item !== null);
        })
      );
  }

  /**
   * send patch request to the firebase for edit user
   * @param key
   * @param value
   * @returns
   */

  editEmployee(key: string, value: any) {
    return this.http.patch(
      'https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user/' +
        key +
        '.json',
      value
    );
  }

  /**
   * send patch request and set the isDeleted filed to true and make the user to be deleted.
   * @param key
   * @returns
   */

  deleteEmployee(key: string | undefined) {
    return this.http.patch(
      'https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user/' +
        key +
        '.json',
      {
        isDeleted: true,
      }
    );
  }

  /**
   * get the user by his localId for set form of dialogue box
   * @param key
   * @returns
   */

  getEmployeeByKey(key: any) {
    return this.http.get(
      'https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user/' +
        key +
        '.json'
    );
  }

  /**
   * get the error message and format the error message.
   * @param errorRes
   * @returns
   */
  errorHandler(errorRes: HttpErrorResponse) {

    let errorMessage = 'UnKnown Error Occurred';
    if (!errorRes?.error || !errorRes?.error?.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Found';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'Invalid Email';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is Invalid';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Admin Restrict this Account';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Exist';
        break;
      default:
        errorMessage = 'Unknown Error'; // Set a default message for unmatched cases
    }
    return throwError(() => new Error(errorMessage));
  }
}
