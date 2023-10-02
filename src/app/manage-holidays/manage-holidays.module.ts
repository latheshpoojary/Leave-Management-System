import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { ManageHolidaysRoutingModule } from './manage-holidays-routing.module';
import { HolidayComponent } from './holiday/holiday.component';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { HolidayFormComponent } from './holiday-form/holiday-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { HolidayPipe } from '../shared/pipe/holiday.pipe';
@NgModule({
  declarations: [
    HolidayComponent,
    HolidayFormComponent,
    HolidayPipe,
  ],
  imports: [
    CommonModule,
    ManageHolidaysRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropList,
    NgxSkeletonLoaderModule
    
  ],
  providers:[TitleCasePipe],
})
export class ManageHolidaysModule { }
