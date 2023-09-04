import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  
  constructor(private http:HttpClient) { }
  getAllHolidays(){
    return this.http.get('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/holidays.json').pipe(
      map(
        (employee: any) => {
          const dataArray = Object.keys(employee).map(key => ({
             key: key,
            ...employee[key]
          }));
          return dataArray;
      }));
  }

  addHoliday(value:any){
    console.log(value,"Form holiday Service");
    
    return this.http.post('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/holidays.json',value);
  }

  getHolidayById(key:string){
    return this.http.get('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/holidays/'+key+'.json');
  }

  updateHoliday(key:string,value:any){
    return this.http.put('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/holidays/'+key+'.json',value);
  }

  deleteHoliday(key:string){
    console.log(key,"delete key on Service");
    
    return this.http.delete('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/holidays/'+key+'.json');
  }

}
