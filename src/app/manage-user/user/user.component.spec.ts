import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ManageUserRoutingModule } from '../manage-user-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/shared/services/user/user.service';
import { BehaviorSubject, of } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { Dialog } from '@angular/cdk/dialog';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let service:jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('UserService',['getAllEmployees']);
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        HttpClientModule,
        CommonModule,
        ManageUserRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        CdkDrag,
        CdkDragPlaceholder,
        CdkDropList,
        MatSnackBarModule,
        NoopAnimationsModule ],
      providers:[{
        provide:MAT_DIALOG_DATA,
        useValue:{}
      },
    {
      provide: MatDialogRef,
       useValue: {}
    },
    {
      provide:UserService,
      useValue:serviceSpy
    },
   

  ]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    service.getAllEmployees.and.returnValue(of(
     {key: '56k5q1uP0gacohsDaOqpGPZsbK62', designation: 'react', email: 'vishal123@gmail.com', id: 1, isDeleted: false, 
      name: "vishal",
      password: "vishal123",
      role: "Employee"})
    )
    
    fixture.detectChanges();

})
     
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fetAllEmployee()',()=>{
    it('should call the service method',()=>{
      expect(service.getAllEmployees).toHaveBeenCalled();
      expect(service.getAllEmployees).toHaveBeenCalledTimes(1)
    })
  })

  describe('handleChange()',()=>{
    let button:HTMLButtonElement | null;
    let handleChangeSpy:any;
    beforeEach(()=>{
      handleChangeSpy = spyOn(component,'handleChanges');
      const dom :HTMLElement= fixture.debugElement.nativeElement;
      button = dom.querySelector('.addBtn');
      button?.click();
    })
    it('should invoked when add button is clicked',()=>{
        expect(handleChangeSpy).toHaveBeenCalled();
        expect(handleChangeSpy).toHaveBeenCalledOnceWith('add');
    })

    it('should set the component value',()=>{
    })
  })
});
