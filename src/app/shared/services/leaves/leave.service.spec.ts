import { TestBed } from '@angular/core/testing';

import { LeaveService } from './leave.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('LeaveService', () => {
  let service: LeaveService;
  let http:HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(LeaveService);
    http=TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
