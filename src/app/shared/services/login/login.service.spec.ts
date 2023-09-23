import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  TestBed.configureTestingModule({
      
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new LoginService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return email not found error',()=>{
    const mockErrorResponse = {error:{
      error:{
        message:'INVALID_PASSWORD',
      },
    }};
    const res=service.errorHandler(new HttpErrorResponse(mockErrorResponse));
    res.subscribe(
      {
        next:()=>console.log(),
        error:(error:string)=>{
          expect(error);
        }
        
      }
    );
  });
});
