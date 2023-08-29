import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageHolidaysRoutingModule } from './manage-holidays-routing.module';
import { HolidayComponent } from './holiday/holiday.component';


@NgModule({
  declarations: [
    HolidayComponent
  ],
  imports: [
    CommonModule,
    ManageHolidaysRoutingModule
  ]
})
export class ManageHolidaysModule { }
