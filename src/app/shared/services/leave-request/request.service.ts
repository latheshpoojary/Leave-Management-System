import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(readonly http: HttpClient) {}

  /**
   * send all the requested leaves
   * @returns array of leave request
   */
  getAllLeaves() {
    return this.http
      .get(
        'https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves.json',
      )
      .pipe(
        map(res => {
          const leavesArr: any[] = [];
          if (res) {
            Object.entries(res).forEach(([uid, val]) => {
              Object.entries(val).forEach(([leaveId, leave]: any) => {
                if (leave.status === 'pending') {
                  leavesArr.push({
                    ...Object(leave),
                    leaveId,
                    uid,
                  });
                }
              });
            });
          }
          return leavesArr;
        }),
      );
  }

  /**
   * set the leaves status and send the response
   * @param status
   * @param userKey
   * @param leaveKey
   * @returns
   */

  updateStatus(status: string, userKey: string, leaveKey: string) {
    return this.http.patch(
      `https://leave-management-system-b6f99-default-rtdb.firebaseio.com/leaves/${ 
        userKey 
        }/${ 
        leaveKey 
        }.json`,
      {
        status,
      },
    );
  }
}
