import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getAllLeaves() {
    return this.http.get('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves.json').pipe(
      map(res => 
        { 
           const leavesArr: any[] = []; 
           Object.entries(res).forEach(([uid, val]) => { 
            Object.entries(val).forEach(([leaveId, leave]:any) => { 
              if(leave.status=="pending"){
              leavesArr.push({ ...Object(leave), leaveId: leaveId, uid: uid }); 

              }
            });
           }); 
          return leavesArr;
        })
    );
  }

  updateStatus(status:string,userKey:string,leaveKey:string){
    return this.http.patch('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/'+userKey+'/'+leaveKey+'.json',{
      status:status
    })

  }
}
