import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { map } from 'rxjs';

export const employeeResolver: ResolveFn<boolean> = (route, state):any => {
  const service = inject(UserService);
  let employee: any[]=[];
  service.getAllEmployees().pipe(
    map(
      (employee: any) => {
        const dataArray = Object.keys(employee).map(key => ({
           key: key,
          ...employee[key]
        }));
        return dataArray;
    }))
  .subscribe(response=>{
    employee= response;
  },
  error=>{
    alert("Something went wrong")
    return null;
  })
  return employee;
  
};
