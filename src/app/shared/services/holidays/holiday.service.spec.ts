import { TestBed } from '@angular/core/testing';

import { HolidayService } from './holiday.service';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs';

describe('HolidayService', () => {
  let service: HolidayService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {

    TestBed.configureTestingModule({
      
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post','get']);

    service = new HolidayService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addHoliday()',()=>{
    it('should give a holiday list response to the get call',(done:DoneFn)=>{
      const requestPayload = { event: "independence day", description: "dscdscfvcsc", date: "02-02-2023", type: "National" };

      service.addHoliday(requestPayload);
      expect(httpClientSpy.post).toHaveBeenCalledWith('https://leave-management-system-b6f99-default-rtdb.firebaseio.com/holidays.json', requestPayload);
      done();
    })
  })

  describe('getAllHolidays()',()=>{
    it("should give the entire holiday list",(done:DoneFn)=>{
      const responseBody=[
        
           {
            "key":"-Ne4-tJapWE_PtvSIhIy",
            "date": "2023-10-01T18:30:00.000Z",
            "description": "the day we celebrate as the Gandhi birthday",
            "event": "gandhi jayanthi",
            "type": "National"
          },
           {
            "key":"-Ne6xo1VbAp73dEQT3z-",

            "date": "2024-01-25T18:30:00.000Z",
            "description": "the day we celebrate as constitutuion",
            "event": "republic day",
            "type": "National"
          },
           {
            "key":"-Ne6y6lOrAaEuCoO7IL3",
            "date": "2024-04-30T18:30:00.000Z",
            "description": "the day we celebrate as the may stating day",
            "event": "may day",
            "type": "National"
          },
           {
            "key":"-Ne6yK7vFLG19yBNaP4D",
            "date": "2024-05-09T18:30:00.000Z",
            "description": "the day where we vote for party",
            "event": "polling day",
            "type": "National"
          },
           {
            "key":"-Ne6zEc4ZoDtf0sMoOXj",
            "date": "2024-08-14T18:30:00.000Z",
            "description": "the day we celebrate as freedom day",
            "event": "independence day",
            "type": "National"
          },
          {
            "key":"-Ne6zWeMcpeUsPMfH_7w",
            "date": "2023-09-17T18:30:00.000Z",
            "description": "the day we celebrate as the god ganesh naming ceremony",
            "event": "varasiddhi vinayaka vrata",
            "type": "Religious"
          },
           {
            "key":"-Ne6zwfM1ckYECZALyWq",
            "date": "2023-10-22T18:30:00.000Z",
            "description": "the day we respect each and every material",
            "event": "mahanavami,ayudhapooja",
            "type": "Religious"
          },
           {
            "key":"-Ne7-_EIaT3HGjV6nbTp",
            "date": "2023-10-31T18:30:00.000Z",
            "description": "the day we celebrate as the Karnataka naming celebration",
            "event": "kannada rajyothsava",
            "type": "National"
          },
           {
            "key":"-Ne7-hidwWn8u-zZ6Qez",
            "date": "2023-11-13T18:30:00.000Z",
            "description": "the day filled with light",
            "event": "deepavali",
            "type": "Religious"
          },
           {
            "key":"-Ne7-rRCAB_gnP3FW3At",
            "date": "2023-12-24T18:30:00.000Z",
            "description": "the day we celebate as the birth of jesus",
            "event": "christmas",
            "type": "National"
          },
           {
            "key":"-NelroLvBLMXDk4xNiez",
            "date": "2023-09-28T18:30:00.000Z",
            "description": "kjasd jca cbSKsanxJ",
            "event": "Bakrid",
            "type": "National"
          },
           {
            "key":"-NemL8P8_u0dFMglKQSq",
            "date": "2023-12-31T18:30:00.000Z",
            "description": "knasjknsjcj akjschbdsv kjsncds",
            "event": "new year",
            "type": "National"
          },
           {
            "key":"-NesYvZ6SDXZgXOcWf7B",
            "date": "2023-09-28T18:30:00.000Z",
            "description": "the day kmskxnsn",
            "event": "10th aniversary",
            "type": "National"
          },
           {
            "key":"-NewGVPsZb3jGuToOdBW",
            "date": "2023-10-19T18:30:00.000Z",
            "description": "the day msamknsd..............",
            "event": "dipavali",
            "type": "Religious"
          }
        ]
      const res=service.getAllHolidays().pipe(map(
        (employee: any) => {
          return  Object.keys(employee).map(key => ({
             key,
            ...employee[key],
          }));
      }));
      res.subscribe(res=>{
        expect(res).toEqual(responseBody);
      })
      done();
    })
  })
});
