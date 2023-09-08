import { Component, ViewChild,AfterViewInit } from '@angular/core';
import { RequestService } from 'src/app/shared/services/leave-request/request.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent {
  leaveRequest!:any[];
  displayedColumns: string[] = ['userId','from', 'to', 'reason', 'type', "action"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
input: any;
  constructor(private requestService:RequestService,private _snackBar: MatSnackBar){
    this.requestService.getAllLeaves().subscribe((response:any)=>{
     this.leaveRequest =response;
     this.dataSource = new MatTableDataSource(this.leaveRequest);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     console.log(this.leaveRequest);
    })
  }

  // ngAfterViewInit(){
  //   try {
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   } catch (error) {
      
  //   }
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadLeaveRequest(){
    this.requestService.getAllLeaves().subscribe((response:any)=>{
      this.leaveRequest =response;
      this.dataSource = new MatTableDataSource(this.leaveRequest);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      console.log(this.leaveRequest);
     })
  }

  onEdit(userId:string,leaveId:string){
    this.requestService.updateStatus("accepted",userId,leaveId).subscribe(response=>{
      if(response){
        this._snackBar.open("Leave Accepted Successfully","close",{
          verticalPosition:'bottom',
          horizontalPosition:'center'
        })
        this.loadLeaveRequest();
      }
      
    })
  }

  onDelete(userId:string,leaveId:string){
    this.requestService.updateStatus("rejected",userId,leaveId).subscribe(response=>{
      if(response){
        this._snackBar.open("Leave Rejected Successfully","close",{
          verticalPosition:'bottom',
          horizontalPosition:'center'
        })
        this.loadLeaveRequest();
      }
      
    })
  }
  
}
