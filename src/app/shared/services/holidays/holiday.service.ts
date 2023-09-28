import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  constructor(readonly http: HttpClient) {}

  /**
   * provide the all the holiday list
   * @returns  array of holiday
   */
  getAllHolidays() {
    return this.http
      .get(
        'https://leave-management-system-b6f99-default-rtdb.firebaseio.com/holidays.json'
      )
      .pipe(
        map((employee: any) => {
          return Object.keys(employee).map((key) => ({
            key,
            ...employee[key],
          }));
        })
      );
  }

  /**
   * send the holiday details to the firebase and return the result
   * @param value
   * @returns
   */
  addHoliday(value: any) {
    return this.http.post(
      'https://leave-management-system-b6f99-default-rtdb.firebaseio.com/holidays.json',
      value
    );
  }

  /**
   * get the holiday by the key for the form of the pop up
   * @param key
   * @returns
   */
  getHolidayById(key: string) {
    return this.http.get(
      `https://leave-management-system-b6f99-default-rtdb.firebaseio.com/holidays/${key}.json`
    );
  }

  /**
   * send put request to the firebase and update the holiday
   * @param key
   * @param value
   * @returns
   */
  updateHoliday(key: string, value: any) {
    return this.http.put(
      `https://leave-management-system-b6f99-default-rtdb.firebaseio.com/holidays/${key}.json`,
      value
    );
  }

  /**
   * delete the holiday based on there key for the firebase.
   * @param key
   * @returns
   */
  deleteHoliday(key: string | undefined) {
    return this.http.delete(
      `https://leave-management-system-b6f99-default-rtdb.firebaseio.com/holidays/${key}.json`
    );
  }
}
