import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveFormComponent } from './leave-form.component';
import { HttpClientModule } from '@angular/common/http';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ManageLeaveListRoutingModule } from '../manage-leave-list-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LeaveFormComponent', () => {
  let component: LeaveFormComponent;
  let fixture: ComponentFixture<LeaveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveFormComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
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
        MatSnackBarModule
      ],
      providers:[{
        provide:MAT_DIALOG_DATA,
        useValue:{}
      },
    {
      provide: MatDialogRef,
       useValue: {}
    }]
    });
    fixture = TestBed.createComponent(LeaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
