import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesListComponent } from './leaves-list.component';

describe('LeavesListComponent', () => {
  let component: LeavesListComponent;
  let fixture: ComponentFixture<LeavesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavesListComponent]
    });
    fixture = TestBed.createComponent(LeavesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
