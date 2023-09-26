import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserComponent } from 'src/app/manage-user/user/user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CdkDrag, CdkDragPlaceholder, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ManageUserRoutingModule } from 'src/app/manage-user/manage-user-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let formBuilder: FormBuilder;
  let dialog :MatDialogRef<UserComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule,MatSnackBarModule,CommonModule,
        NoopAnimationsModule,
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
        CdkDropList,], // Import ReactiveFormsModule
      providers: [FormBuilder,
        { provide: MatDialogRef, useValue: {} }, // Provide a mock for MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} } ] 
    });
    fixture = TestBed.createComponent(UserFormComponent);
    formBuilder = TestBed.inject(FormBuilder);
    dialog = TestBed.inject(MatDialogRef<UserComponent>)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 



});
