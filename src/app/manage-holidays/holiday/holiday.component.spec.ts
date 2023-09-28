import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayComponent } from './holiday.component';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ManageHolidaysRoutingModule } from '../manage-holidays-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HolidayPipe } from 'src/app/shared/pipe/holiday.pipe';
import { HolidayService } from 'src/app/shared/services/holidays/holiday.service';
import { filter, from, of } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

describe('HolidayComponent', () => {
  let component: HolidayComponent;
  let fixture: ComponentFixture<HolidayComponent>;
  let load: jasmine.Spy<jasmine.Func>;
  let service: jasmine.SpyObj<HolidayService>;
  let dataSource = new MatTableDataSource<any>();
  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('HolidayService', [
      'getAllHolidays',
    ]);
    TestBed.configureTestingModule({
      declarations: [HolidayComponent, HolidayPipe],
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        HttpClientModule,
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
        MatSnackBarModule,
      ],
      providers: [
        TitleCasePipe,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: HolidayService,
          useValue: serviceSpy,
        },
      ],
    });
    fixture = TestBed.createComponent(HolidayComponent);
    service = TestBed.inject(HolidayService) as jasmine.SpyObj<HolidayService>;
    service.getAllHolidays.and.returnValue(
      of([
        {
          date: '2023-02-12',
        },
      ])
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInIt', () => {
    it('should call the ngOnInit loadHoliday method', () => {
      load = spyOn(component, 'loadHoliday');
      component.ngOnInit();
      expect(load).toHaveBeenCalled();
      expect(load).toHaveBeenCalledTimes(1);
      expect(load).toHaveBeenCalledWith();
    });
  });

  describe('loadHoliday()', () => {
    it('should call service method', () => {
      /* your array data here */
      component.loadHoliday();
      expect(service.getAllHolidays).toHaveBeenCalled();
      expect(service.getAllHolidays).toHaveBeenCalledTimes(2);
    });


    it('should change the isLoading value ',()=>{
      component.loadHoliday();
      expect(component.isLoading).toBeFalse();
    })

    it('should store the response in the array',()=>{
      component.loadHoliday();
      expect(component.holidays.length).toBeGreaterThan(0);
    })

    it('should call the upcoming method',()=>{
      const isUpcomignSpy = spyOn(component,'isUpcoming').and.callFake((holidayDate)=>{
        if(holidayDate==='2023-02-12')
        {
          return true;
        }
        else{
          return false;
        }
      });
      expect()
      expect(component.isUpcoming('2023-02-12')).toBeTrue();

    })
  });

  describe('HandleChange method',()=>{

    it('should called by while clicking add button',()=>{
      const handleChangeSpy = spyOn(component,'handleChanges');
      const mixture:HTMLElement = fixture.debugElement.nativeElement;
      const button = mixture.querySelector('.addbtn');
      button?.addEventListener('click',()=>{
        expect(handleChangeSpy).toHaveBeenCalled();
        expect(handleChangeSpy).toHaveBeenCalledTimes(1);
        expect(handleChangeSpy).toHaveBeenCalledOnceWith('add');
      })

      const event = new MouseEvent('click');
      button?.dispatchEvent(event);
    })
    it('should called by while clicking delete button',()=>{
      dataSource.data = [{
        event:'holiday',
        description:"anxa jwandhjbc kjnsc",
        date:'2023-11-27',
        type:'National'
      }]
      const handleChangeSpy = spyOn(component,'handleChanges');
      const mixture:HTMLElement = fixture.debugElement.nativeElement;
      const button = mixture.querySelector('.deleteBtn');
      button?.addEventListener('click',()=>{
        expect(handleChangeSpy).toHaveBeenCalled();
       
      })

      const event = new MouseEvent('click');
      button?.dispatchEvent(event);
    })
  })

  
});
