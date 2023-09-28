import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayFormComponent } from './holiday-form.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ManageHolidaysRoutingModule } from '../manage-holidays-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HolidayService } from 'src/app/shared/services/holidays/holiday.service';
import { of } from 'rxjs';

describe('HolidayFormComponent', () => {
  let component: HolidayFormComponent;
  let fixture: ComponentFixture<HolidayFormComponent>;
  let service: jasmine.SpyObj<HolidayService>;
  beforeEach(() => {
    service = jasmine.createSpyObj('HolidayService', ['getHolidayById']);
    TestBed.configureTestingModule({
      declarations: [HolidayFormComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
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
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: HolidayService,
          useValue: service,
        },
      ],
    });
    fixture = TestBed.createComponent(HolidayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Form Field', () => {
    it('should create a form with 4 fields', () => {
      const field1 = component.holidayForm.contains('event');
      const field2 = component.holidayForm.contains('description');
      const field3 = component.holidayForm.contains('date');
      const field4 = component.holidayForm.contains('type');
      expect(field1).toBeTrue();
      expect(field2).toBeTrue();
      expect(field3).toBeTrue();
      expect(field4).toBeTrue();
    });

    it('should make the event field required', () => {
      const field1 = component.holidayForm.get('event');
      field1?.setValue('');
      expect(field1?.valid).toBeFalse();
    });
    it('should make the description field required', () => {
      const field1 = component.holidayForm.get('description');
      field1?.setValue('');
      expect(field1?.valid).toBeFalse();
    });
    it('should make the date field required', () => {
      const field1 = component.holidayForm.get('date');
      field1?.setValue('');
      expect(field1?.valid).toBeFalse();
    });
    it('should make the type field required', () => {
      const field1 = component.holidayForm.get('type');
      field1?.setValue('');
      expect(field1?.valid).toBeFalse();
    });

    it('date should be grater than  today', () => {
      const dateField = component.holidayForm.get('date');
      dateField?.setValue('2023-09-29T18:30:00.000Z');
      const hasError = dateField?.hasError('beforeToday');
      expect(hasError).toBeFalse();
    });
  });

  describe('PopUp() method ', () => {
    it('should set the pop up value', () => {
      component.data.key = 'knakjnsjwsinds1232ds';
      const popUpSpy = spyOn(component, 'setPopUpValue');
      component.ngOnInit();
      expect(popUpSpy).toHaveBeenCalled();
      expect(popUpSpy).toHaveBeenCalledTimes(1);
      expect(popUpSpy).toHaveBeenCalledOnceWith(component.data.key);
    });

    it('should call the service method', () => {
      const serviceCall = service.getHolidayById.and.returnValue(
        of({
          date: '2023-10-01T18:30:00.000Z',
          description: 'the day we celebrate as the Gandhi birthday',
          event: 'gandhi jayanthi',
          type: 'National',
        })
      );
      component.setPopUpValue('njsdch76ew3266');
      expect(serviceCall).toHaveBeenCalled();
      expect(serviceCall).toHaveBeenCalledTimes(1);
      expect(serviceCall).toHaveBeenCalledOnceWith('njsdch76ew3266');
    });

    it('should set the form Value for edit', () => {
      const serviceCall = service.getHolidayById.and.returnValue(
        of({
          date: '2023-10-01T18:30:00.000Z',
          description: 'the day we celebrate as the Gandhi birthday',
          event: 'gandhi jayanthi',
          type: 'National',
        })
      );
      component.setPopUpValue('snajchbsre2363');
      expect(component.holidayForm.get('date')?.value).toEqual(
        '2023-10-01T18:30:00.000Z'
      );
      expect(component.holidayForm.get('description')?.value).toEqual(
        'the day we celebrate as the Gandhi birthday'
      );
      expect(component.holidayForm.get('event')?.value).toEqual(
        'gandhi jayanthi'
      );
      expect(component.holidayForm.get('type')?.value).toEqual('National');
    });
  });

  // describe('OnSubmit() method', () => {
  //   it('should call the onSubmit method', (done:DoneFn) => {
  //     const serviceCall = service.getHolidayById.and.returnValue(
  //       of({
  //         date: '2023-10-01T18:30:00.000Z',
  //         description: 'the day we celebrate as the Gandhi birthday',
  //         event: 'gandhi jayanthi',
  //         type: 'National',
  //       })
  //     );
  //     // component.holidayForm.setValue({
  //     //   event: serviceCall,
  //     //   description: 'the day we celebrate as the Gandhi birthday',
  //     //   date: '2023-10-01T18:30:00.000Z',
  //     //   type: 'National',
  //     // });
  //     component.setPopUpValue('hxdsc27e');
      
  //     const onSubmitSpy = spyOn(component, 'onSubmit');
  //     const fixtureRef: HTMLElement = fixture.debugElement.nativeElement;
  //     const button = fixtureRef.querySelector('.add');
      
  //     // Attach a click event listener to the button
  //     button?.addEventListener('click', () => {
  //       // Ensure that onSubmitSpy is called
  //       expect(onSubmitSpy).toHaveBeenCalled();
  
  //       // Call done to signal the completion of the asynchronous operation
  //       done();
  //     });
  
  //     // Trigger a click event on the button
  //     const clickEvent = new MouseEvent('click');
  //     button?.dispatchEvent(clickEvent);
  //   });
  // });
  
});
