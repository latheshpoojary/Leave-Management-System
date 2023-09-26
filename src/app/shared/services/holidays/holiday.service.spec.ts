import { TestBed } from '@angular/core/testing';

import { HolidayService } from './holiday.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('HolidayService', () => {
  let service: HolidayService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let holiday = {
    "date": "2023-10-01T18:30:00.000Z",
    "description": "the day we celebrate as the Gandhi birthday",
    "event": "gandhi jayanthi",
    "type": "National"
  }
  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['post','get']);
    TestBed.configureTestingModule({
      providers:[HolidayService,
        {
        provide:HttpClient,
        useValue:httpClientSpyObj
      }
    ]
    });
    service = TestBed.inject(HolidayService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

  });

  describe('getHolidayById',()=>{
    it('should return the holiday by it id',(done:DoneFn)=>{
      httpClientSpy.get.and.returnValue(of(null));
      service.getHolidayById('-Ne4-tJapWE_PhbSIhIy').subscribe({
        next:res=>{
          expect(res).toBeNull();
          done();
           },
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
});
