import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveFormComponent } from './leave-form.component';
import { HttpClientModule } from '@angular/common/http';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LeaveService } from 'src/app/shared/services/leaves/leave.service';
import { of } from 'rxjs';

describe('LeaveFormComponent', () => {
  let component: LeaveFormComponent;
  let fixture: ComponentFixture<LeaveFormComponent>;
  let service: jasmine.SpyObj<LeaveService>;
  let toField: AbstractControl<any, any> | null;
  let typeField: AbstractControl<any, any> | null;
  let reasonField: AbstractControl<any, any> | null;
  let fromField: AbstractControl<any, any> | null;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('LeaveService', [
      'addLeaves',
      'editLeave',
      'deleteLeave',
      'fetchLeave',
      'fetchLeaveByKey',
    ]);
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
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: LeaveService,
          useValue: serviceSpy,
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    });
    fixture = TestBed.createComponent(LeaveFormComponent);
    service = TestBed.inject(LeaveService) as jasmine.SpyObj<LeaveService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.data.leaveKey = '123abc';
    reasonField = component.leaveForm.get('reason');
    typeField = component.leaveForm.get('type');
    toField = component.leaveForm.get('to');
    fromField = component.leaveForm.get('from');
    service.fetchLeaveByKey.and.returnValue(of({casual_leave: 1,from: "2023-09-27T18:30:00.000Z",
    reason: "Goa Trip",
    status: "pending",
    to: "2023-09-27T18:30:00.000Z",
    type: "Casual Leave",
    userId: "2"}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should contain the form with 4 fields', () => {
      const field1 = component.leaveForm.contains('from');
      const field2 = component.leaveForm.contains('to');
      const field3 = component.leaveForm.contains('type');
      const field4 = component.leaveForm.contains('reason');

      expect(field1).toBeTrue();
      expect(field2).toBeTrue();
      expect(field3).toBeTrue();
      expect(field4).toBeTrue();
    });
    it('should make the from field required', () => {
      fromField?.setValue('');
      expect(fromField?.valid).toBeFalse();
    });
    it('should make the to field required', () => {
      toField?.setValue('');
      expect(toField?.valid).toBeFalse();
    });
    it('should make the type field required', () => {
      typeField?.setValue('');
      expect(typeField?.valid).toBeFalse();
    });
    it('should make the reason field required', () => {
      reasonField?.setValue('');
      expect(reasonField?.valid).toBeFalse();
    });

    it('should validate the from date', () => {
      const newDate = new Date('2023-09-09');
      fromField?.setValue(newDate);
      expect(fromField?.valid).toBeFalse();
    });
    it('should validate the to date', () => {
      const newDate = new Date('2023-09-09');
      toField?.setValue(newDate);
      expect(toField?.valid).toBeFalse();
    });

    it('should check  from date grater than to date ', () => {
      const fromDate = new Date('2023-10-09');
      const toDate = new Date('2023-10-08');
      fromField?.setValue(fromDate);
      toField?.setValue(toDate);
      expect(toField?.hasError('greaterThan')).toBeTrue();
    });
  });

  describe('ngOnInIt', () => {
    it('should set the editMode value', () => {
      component.ngOnInit();
      expect(component.isEditMode).toBeTrue();
    });

    it('should call the setFormValue method', () => {
      const setFormValueSpy = spyOn(component, 'setFormValue');
      component.ngOnInit();
      expect(setFormValueSpy).toHaveBeenCalled();
    });
  });

  describe('setFormValue()', () => {
    it('should call service method ', () => {
      component.data.leaveKey = 'jnajx728w';
      component.data.key ='1721'
      component.setFormValue();
      expect(service.fetchLeaveByKey).toHaveBeenCalled();
      expect(service.fetchLeaveByKey).toHaveBeenCalledTimes(1);
      expect(service.fetchLeaveByKey).toHaveBeenCalledWith('jnajx728w','1721');
    });

    xit('should set the form value taken from the service', () => {
      component.data.leaveKey = 'jnajx728w';
      component.data.key ='1721'
      component.ngOnInit();
      component.setFormValue();
      expect(component.leaveForm.valid).toBeTrue();
    });
  });



    
});
