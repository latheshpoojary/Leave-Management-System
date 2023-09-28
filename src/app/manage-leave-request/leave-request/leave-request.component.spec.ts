import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveRequestComponent } from './leave-request.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkDrag, CdkDragPlaceholder, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ManageLeaveRequestRoutingModule } from '../manage-leave-request-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RequestService } from 'src/app/shared/services/leave-request/request.service';

describe('LeaveRequestComponent', () => {
  let component: LeaveRequestComponent;
  let fixture: ComponentFixture<LeaveRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveRequestComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientModule ,
        MatSnackBarModule,
        MatFormFieldModule,
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
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        CdkDrag,
        CdkDragPlaceholder,
        CdkDropList,
      ],
      providers:[
        {
          provide:RequestService,
        }
      ]
    });
    fixture = TestBed.createComponent(LeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should call the loadLeaveRequest',()=>{
      component.ngOnInit();
    })
 })

