import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { ManageUserRoutingModule } from './manage-user-routing.module';
import { UserComponent } from './user/user.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { UserFormComponent } from '../shared/user-form/user-form.component';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    UserComponent,
    DeleteDialogComponent,
    UserFormComponent,
   
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
    ReactiveFormsModule,
    MatDialogModule,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropList,
    
  ],
  providers:[TitleCasePipe],
})
export class ManageUserModule { }
