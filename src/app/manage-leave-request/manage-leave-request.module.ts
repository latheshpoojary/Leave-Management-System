import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLeaveRequestRoutingModule } from './manage-leave-request-routing.module';
import { LeaveRequestComponent } from './leave-request/leave-request.component';


@NgModule({
  declarations: [
    LeaveRequestComponent
  ],
  imports: [
    CommonModule,
    ManageLeaveRequestRoutingModule
  ]
})
export class ManageLeaveRequestModule { }
