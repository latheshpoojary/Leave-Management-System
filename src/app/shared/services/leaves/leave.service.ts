import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  
  constructor(private http: HttpClient, private loginService: LoginService) {

  }


  addLeaves(value: any) {
    const userKey = localStorage.getItem("user");
    return this.http.post('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/' + userKey + '.json', {
      ...value,
      userId: localStorage.getItem("userId"),
      status:"pending"
    });
  }

  editLeave(key:string,userKey:string,value:any){
    return this.http.patch('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/' + userKey + '/'+key+'.json',value);
  }

  deleteLeave(key:any ,userKey:any){
    return this.http.delete('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/' + userKey + '/'+key+'.json');
  }

  fetchLeave(userKey:string | null) {
    return this.http.get('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/' + userKey + '.json').pipe(
      map((response: any) => {
        if (response) {
          const leaveArray = Object.keys(response).map(key => ({
            id: key,
            ...response[key]
          }))
          return leaveArray;
        }
        else{
          return null;
        }
    }));
  }

  fetchLeaveByKey(key:string,userKey:string){
    return this.http.get('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/' + userKey + '/'+key+'.json');
  }

}
