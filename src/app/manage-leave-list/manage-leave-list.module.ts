import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLeaveListRoutingModule } from './manage-leave-list-routing.module';
import { LeavesListComponent } from './leaves-list/leaves-list.component';
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
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    LeavesListComponent,
    LeaveFormComponent
  ],
  imports: [
    CommonModule,
    ManageLeaveListRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropList,
  ]
})
export class ManageLeaveListModule { }
