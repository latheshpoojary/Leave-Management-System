import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, switchMap, throwError } from 'rxjs';

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
  key:string,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId$=new BehaviorSubject<any>(1);
  constructor(private http: HttpClient) { }

  addEmployee(email: string, password: string,formValue:any) {
    return this.http.post<User>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnEP3tGFunKNJ9UUtzZVpcu07cAbdHO4o', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      switchMap((response)=>{
        
       return this.addEmployeeRealTime(formValue,response.localId);
        
      }),
      catchError(this.errorHandler) 
    )
  }

  /**
   * x`
   * @param user 
   * @param id 
   * @returns 
   */
  addEmployeeRealTime(user:any,id:string){
    console.log(user);
    this.userId$.subscribe(response=>{
      console.log(response,"UserId on addEmployee");
      
    })
    
    return this.http.put<UserDetails[]>('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user/'+id+'.json',{
      name:user.name,
      designation:user.designation,
      role:user.role,
      email:user.email,
      password:user.password,
      isDeleted:false,
      id:this.userId$.value
    });
  }


  getAllEmployees():Observable<any>{
    return this.http.get('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user.json').pipe(
      map(
        (employee: any) => { 
          const dataArray = Object.keys(employee).map((key) =>{
            if(!employee[key].isDeleted){
              return {
                 key:key,
                 ...employee[key]
                }
             }
            else{
              return null;
            }
          }        
        );
          return dataArray.filter((item)=>item!==null);
      })
    );
  }

  editEmployee(key:string,value:any){
    return this.http.patch('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user/'+key+'.json',value);
  }

  deleteEmployee(key:string){
    return this.http.patch('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user/'+key+'.json',{
      isDeleted:true
    });
  }

  getEmployeeByKey(key:any){
    return this.http.get('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/user/'+key+'.json');
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
        errorMessage = "Invalid Email";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "Password is Invalid";
        break;
      case 'USER_DISABLED':
        errorMessage = "Admin Restrict this Account";
        break;
      case 'EMAIL_EXISTS':
        errorMessage = "Email Exist";
        break;
      default:
        errorMessage = "Unknown Error"; // Set a default message for unmatched cases
    }
    return throwError(errorMessage);
  }
  

}
