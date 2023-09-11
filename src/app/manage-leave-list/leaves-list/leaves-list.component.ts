import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeaveService } from 'src/app/shared/services/leaves/leave.service';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from 'src/app/manage-user/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-leaves-list',
  templateUrl: './leaves-list.component.html',
  styleUrls: ['./leaves-list.component.scss']
})
export class LeavesListComponent {
  public leaves:any[] =[];
  remaining_casual_leave!:any;
  remaining_sick_leave!:any;
  remaining_paternity_leave!:any;
  displayedColumns: string[] = ['from', 'to', 'reason', 'type', "status", "action"];
  dataSource!: MatTableDataSource<any>;
  public userKey!:string | null ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public leaveService:LeaveService,private dialogue:MatDialog,private _snackBar: MatSnackBar){
  this.userKey = localStorage.getItem("user");
   this.leaveService.fetchLeave(this.userKey).subscribe((response:any)=>{
      this.leaves = response;
      if(response){
        const lastResponse=response[response.length-1];
        this.leaveService.remaining_casual_leaves.next(lastResponse.casual_leave);
        this.leaveService.remaining_sick_leaves.next( lastResponse.sick_leave);
        this.leaveService.remaining_paternity_leaves.next(lastResponse.paternity_leave);
      }
      

      this.dataSource = new MatTableDataSource(this.leaves);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.leaves);
   })
   
  }

  loadLeaves(){
    this.leaveService.fetchLeave(this.userKey).subscribe((response:any)=>{
      this.leaves = response;
      if(response){
        const lastResponse=response[response.length-1];
        this.leaveService.remaining_casual_leaves.next(lastResponse.casual_leave);
        this.leaveService.remaining_sick_leaves.next( lastResponse.sick_leave);
        this.leaveService.remaining_paternity_leaves.next(lastResponse.paternity_leave);
      }
        this.dataSource = new MatTableDataSource(this.leaves);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.leaves);
      
     })
  }
  onAdd(){
    this.openPopUp(LeaveFormComponent);
  }
  
  onEdit(key:string){
    this.openPopUp(LeaveFormComponent,key,this.userKey);

  }

  onDelete(key:string){
    this.openPopUp(DeleteDialogComponent,key,this.userKey);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    const dataArray = this.dataSource.data;
    moveItemInArray(dataArray , event.previousIndex, event.currentIndex);
    this.dataSource.data = dataArray;

  }

  openPopUp(component:any,key?:string,userKey?:string | null) {
    const addPopUpRef=this.dialogue.open(component,{
      data:{
        key:key,
        userKey:userKey
      }
    });
    addPopUpRef.afterClosed().subscribe(response=>{   
      if(response){
        this.leaveService.deleteLeave(key,userKey).subscribe(response=>{
          console.log(response);
          this.loadLeaves();   
          this._snackBar.open("Leave Request Deleted Successfully","close",{
            duration:2000
          })
        })
        }
      else{
        this.loadLeaves();
      }  
    })
  }
}

