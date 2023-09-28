import { Component, ViewChild,AfterViewInit ,OnInit} from '@angular/core';
import { RequestService } from 'src/app/shared/services/leave-request/request.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
})
export class LeaveRequestComponent implements OnInit, AfterViewInit{
  leaveRequest!: any[];
  displayedColumns: string[] = ['userId', 'from', 'to', 'reason', 'type', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  input: any;
  constructor(readonly requestService: RequestService, readonly _snackBar: MatSnackBar) {
    
  }
  ngOnInit(): void {
    this.loadLeaveRequest();
  }

  

  ngAfterViewInit() {
    try {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.log(error);
    }
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
    moveItemInArray(dataArray, event.previousIndex, event.currentIndex);
    this.dataSource.data = dataArray;

  }

  /**
   * load the leave request form the firebase.
   */
  loadLeaveRequest() {
    this.requestService.getAllLeaves().subscribe((response: any) => {
      console.log(response);
      
      this.leaveRequest = response;
      this.dataSource = new MatTableDataSource(this.leaveRequest);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * send accept message to the service and display snackBar message 
   * @param userId 
   * @param leaveId 
   */

  onEdit(userId: string, leaveId: string) {
    this.requestService.updateStatus('accepted', userId, leaveId).subscribe(response => {
      if (response) {
        this._snackBar.open('✅  Leave Accepted Successfully', '❌', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration:2000,
        });
        this.loadLeaveRequest();
      }
    });
  }

  /**
   * send reject message to the service and display snackBar message
   * @param userId 
   * @param leaveId 
   */
  onDelete(userId: string, leaveId: string) {
    this.requestService.updateStatus('rejected', userId, leaveId).subscribe(response => {
      if (response) {
        this._snackBar.open('✅ Leave Rejected Successfully', '❌', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration:2000,
        });
        this.loadLeaveRequest();
      }
    });
  }
}
