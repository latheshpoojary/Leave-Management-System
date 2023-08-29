import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLeaveListRoutingModule } from './manage-leave-list-routing.module';
import { LeavesListComponent } from './leaves-list/leaves-list.component';


@NgModule({
  declarations: [
    LeavesListComponent
  ],
  imports: [
    CommonModule,
    ManageLeaveListRoutingModule
  ]
})
export class ManageLeaveListModule { }
