import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeaveService } from 'src/app/shared/services/leaves/leave.service';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonService } from 'src/app/shared/services/common.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaves-list',
  templateUrl: './leaves-list.component.html',
  styleUrls: ['./leaves-list.component.scss'],
})
export class LeavesListComponent {
  public leaves: any[] = [];
  displayedColumns: string[] = [
    'from',
    'to',
    'reason',
    'type',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<any>();
  public userKey!: string | null;
  dialogueRef$!: Observable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public leaveService: LeaveService,
    readonly dialogue: MatDialog,
    readonly _snackBar: MatSnackBar,
    readonly commonService: CommonService
  ) {
    this.userKey = localStorage.getItem('user');
    this.leaveService.fetchLeave(this.userKey).subscribe((response: any) => {
      this.leaves = response;
      if (response) {
        const lastResponse = response[response.length - 1];
        this.leaveService.remaining_casual_leaves.next(
          lastResponse.casual_leave
        );
        this.leaveService.remaining_sick_leaves.next(lastResponse.sick_leave);
        this.leaveService.remaining_paternity_leaves.next(
          lastResponse.paternity_leave
        );
      }
      this.dataSource.data = this.leaves;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
   * load all the leaves of the user
   */

  loadLeaves() {
    this.leaveService.fetchLeave(this.userKey).subscribe((response: any) => {
      this.leaves = response;
      if (response) {
        const lastResponse = response[response.length - 1];
        this.leaveService.remaining_casual_leaves.next(
          lastResponse.casual_leave
        );
        this.leaveService.remaining_sick_leaves.next(lastResponse.sick_leave);
        this.leaveService.remaining_paternity_leaves.next(
          lastResponse.paternity_leave
        );
      }
      this.dataSource.data = this.leaves;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  handleChange(operation: string, leaveKey?: string) {
    let component;
    if (operation === 'add' || operation === 'edit') {
      component = LeaveFormComponent;
    } else {
      component = DeleteDialogComponent;
    }
    this.dialogueRef$ = this.commonService.openDialogue(
      component,
      leaveKey,
      this.userKey,
      '',
      'Are you sure want to delete this Leave'
    );
    this.afterDialogueClosed(leaveKey, this.userKey);
  }

  afterDialogueClosed(leaveKey?: string, userKey?: string | null) {
    this.dialogueRef$.subscribe((response) => {
      if (response === 'success') {
        this.loadLeaves();
      } else if (response) {
        this.leaveService.deleteLeave(leaveKey, userKey).subscribe(() => {
          this._snackBar.open('✅  Leave Request Deleted Successfully', '❌', {
            duration: 2000,
          });
          this.loadLeaves();
        });
      } else {
        return;
      }
    });
  }
}
