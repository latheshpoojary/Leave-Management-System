import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'holidayAsc',

})
export class HolidayPipe implements PipeTransform {

  transform(array:any[]) {
    array.sort((holiday1:any,holiday2:any)=>{
      if(holiday1['date']>holiday2['date']){
        return 1;
      }
      else{
        return -1;
      }
    });
    return array;
  }
  

}
