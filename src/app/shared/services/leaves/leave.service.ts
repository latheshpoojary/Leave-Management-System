import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  public remaining_sick_leaves = new BehaviorSubject<any>(null);
  public remaining_casual_leaves = new BehaviorSubject<any>(null);
  public remaining_paternity_leaves = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private loginService: LoginService) {

  }


  addLeaves(value: any) {
    const userKey = localStorage.getItem("user");
    if (value.type === 'Casual Leave') {
      const currentValue = this.remaining_casual_leaves.value;
      if (currentValue) {
        this.remaining_casual_leaves.next(currentValue - 1);
      }
      else {
        this.remaining_casual_leaves.next(2);
      }
    }
    if (value.type === 'Sick Leave') {
      const currentValue = this.remaining_sick_leaves.value;
      if (currentValue) {
        this.remaining_sick_leaves.next(currentValue - 1);
      }
      else {
        this.remaining_sick_leaves.next(2);
      }
    }
    if (value.type === 'Paternity Leave') {
      const currentValue = this.remaining_paternity_leaves.value;
      if (currentValue) {
        // Create two Date objects for the start and end dates
        const startDate = new Date(value.form);
        const endDate = new Date(value.to);
        

        // Calculate the difference in milliseconds

        // Convert milliseconds to days
        // const daysDifference = Math.floor(timeDifferenceMs / (24 * 60 * 60 * 1000));

        // console.log(`Number of days between the two dates: ${daysDifference}`);


        this.remaining_paternity_leaves.next(currentValue - 1);
      }
      else {
        this.remaining_paternity_leaves.next(2);

      }
    }

    return this.http.post('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/' + userKey + '.json', {
      ...value,
      userId: localStorage.getItem("userId"),
      status: "pending",
      casual_leave: this.remaining_casual_leaves.value,
      sick_leave: this.remaining_sick_leaves.value,
      paternity_leave: this.remaining_paternity_leaves.value
    });


  }

  editLeave(key: string, userKey: string, value: any) {
    return this.http.patch('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/' + userKey + '/' + key + '.json', value);
  }

  deleteLeave(key: any, userKey: any) {
    return this.http.delete('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/' + userKey + '/' + key + '.json');
  }

  fetchLeave(userKey: string | null) {
    return this.http.get('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/' + userKey + '.json').pipe(
      map((response: any) => {
        if (response) {
          const leaveArray = Object.keys(response).map(key => ({
            id: key,
            ...response[key]
          }))
          return leaveArray;
        }
        else {
          return null;
        }
      }));
  }

  fetchLeaveByKey(key: string, userKey: string) {
    return this.http.get('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/' + userKey + '/' + key + '.json');
  }

}
