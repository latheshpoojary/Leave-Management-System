import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule]
    });

    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
