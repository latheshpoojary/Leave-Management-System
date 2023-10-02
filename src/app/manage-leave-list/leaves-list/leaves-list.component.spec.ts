import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesListComponent } from './leaves-list.component';
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
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ManageLeaveListRoutingModule } from '../manage-leave-list-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LeaveService } from 'src/app/shared/services/leaves/leave.service';
import {of } from 'rxjs';
import { compilePipeFromMetadata } from '@angular/compiler';

describe('LeavesListComponent', () => {
  let component: LeavesListComponent;
  let fixture: ComponentFixture<LeavesListComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavesListComponent],
      imports: [
        NoopAnimationsModule,
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
        HttpClientModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { 
          },
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: LeaveService,
        },
      ],
    });
    fixture = TestBed.createComponent(LeavesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  

  it('should call the getLeave method of the service', () => {
    expect(component.leaves).toBeTruthy();
  });

  it('should call the handle change method',()=>{
    const handleChangeSpy = spyOn(component,'handleChange');
    const dom:HTMLElement = fixture.debugElement.nativeElement;
    const button = dom.querySelector('.addBtn');
    button?.addEventListener('click',()=>{
      expect(handleChangeSpy).toHaveBeenCalled();
      expect(handleChangeSpy).toHaveBeenCalledOnceWith('add');
    })

    const event = new MouseEvent('click');
    button?.dispatchEvent(event);

  })

});
