import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { ManageUserRoutingModule } from './manage-user-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule, matSelectAnimations} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatIconModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class ManageUserModule { }
