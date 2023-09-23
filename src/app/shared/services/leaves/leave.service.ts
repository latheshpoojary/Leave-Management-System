import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  public remaining_sick_leaves = new BehaviorSubject<any>(null);
  public remaining_casual_leaves = new BehaviorSubject<any>(null);
  public remaining_paternity_leaves = new BehaviorSubject<any>(null);
  readonly url='https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/';
  constructor(readonly http: HttpClient) {

  }

/**
 * store the leave with the remaining casual,paternity and sick.
 * @param value 
 * @returns 
 */
  addLeaves(value: any) {
    const userKey = localStorage.getItem('user');
    if (value.type === 'Casual Leave') {
      const currentValue = this.remaining_casual_leaves.value;
      if (currentValue) {
        this.remaining_casual_leaves.next(currentValue + 1);
      }
      else {
        this.remaining_casual_leaves.next(1);
      }
    }
    if (value.type === 'Sick Leave') {
      const currentValue = this.remaining_sick_leaves.value;
      if (currentValue) {
        this.remaining_sick_leaves.next(currentValue + 1);
      }
      else {
        this.remaining_sick_leaves.next(1);
      }
    }
    if (value.type === 'Paternity Leave') {
      const currentValue = this.remaining_paternity_leaves.value;
      if (currentValue) {

        this.remaining_paternity_leaves.next(currentValue + 1);
      }
      else {
        this.remaining_paternity_leaves.next(1);

      }
    }
    return this.http.post(`${this.url + userKey  }.json`, {
      ...value,
      userId: localStorage.getItem('userId'),
      status: 'pending',
      casual_leave: this.remaining_casual_leaves.value,
      sick_leave: this.remaining_sick_leaves.value,
      paternity_leave: this.remaining_paternity_leaves.value,
    });
  }

  /**
   * update the leaves by using form value and userKey
   * @param key 
   * @param userKey 
   * @param value 
   * @returns 
   */
  editLeave(key: string, userKey: string, value: any) {
    return this.http.patch(`${this.url+ userKey  }/${  key  }.json`, value);
  }

  /**
   * delete the user leaves based on his userKey
   * @param key 
   * @param userKey 
   * @returns 
   */
  deleteLeave(key: any, userKey: any) {
    return this.http.delete(`${this.url+userKey}/${key }.json`);
  }


  /**
   * gives the specific leaves using key of leaves
   * @param userKey 
   * @returns 
   */
  fetchLeave(leaveKey: string | null) {
    return this.http.get(`${this.url + leaveKey  }.json`).pipe(
      map((response: any) => {
        if (response) {
          return Object.keys(response).map(key => ({
            id: key,
            ...response[key],
          }));
        }
        else {
          return null;
        }
      }));
  }

  fetchLeaveByKey(key: string, userKey: string) {
    return this.http.get(`${this.url+ userKey  }/${  key  }.json`);
  }

}
