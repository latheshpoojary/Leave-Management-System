import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLeaveRequestRoutingModule } from './manage-leave-request-routing.module';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LeaveRequestComponent
  ],
  imports: [
    CommonModule,
    ManageLeaveRequestRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule
  ]
})
export class ManageLeaveRequestModule { }
