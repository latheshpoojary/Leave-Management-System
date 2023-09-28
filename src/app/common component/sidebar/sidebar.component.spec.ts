import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SidebarComponent } from './sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Dialog } from '@angular/cdk/dialog';
import { UserComponent } from 'src/app/manage-user/user/user.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let dialog:MatDialog;
  let dialogRef:MatDialogRef<UserComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        HttpClientModule,
        MatSnackBarModule,
        MatFormFieldModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers:[
        {
          provide:MatDialogRef,
          useValue:{}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialog);
    dialogRef = TestBed.inject(MatDialogRef);
  });
  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInIt',()=>{
    it('should call ngOnIt',()=>{
      expect(component.userName).toBeDefined();
    })
  })

  describe('logOut Method',()=>{
    it('should call logout while logout button pressed',(done:DoneFn)=>{
      const logoutSpy = spyOn(component, 'logout').and.callFake(()=>true);
      const logoutEle:HTMLElement = fixture.nativeElement;
      const button = logoutEle.querySelector('.logOut');
      button?.addEventListener('click',()=>{
        expect(logoutSpy).toHaveBeenCalled();
        expect(logoutSpy).toHaveBeenCalledTimes(1);
        done();
      })
      const clickEvent = new MouseEvent('click');
      button?.dispatchEvent(clickEvent);
    })

    it('should open dialogue box',()=>{
      const dialogOpen = spyOn(dialog,'open').and.callThrough();
      component.logout();
      expect(dialogOpen).toHaveBeenCalled();
      expect(dialogOpen).toHaveBeenCalledTimes(1);
    })

    
  })
  
});
