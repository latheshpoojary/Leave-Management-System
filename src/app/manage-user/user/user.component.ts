import { AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/services/user/user.service';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { UserFormComponent } from '../../shared/user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonService } from 'src/app/shared/services/common.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements AfterViewInit,OnInit {
  isLoading!: boolean;
  dialogueRes$!: Observable<any>;
  /** Constants used to fill up our data base. */
  dataSource=new  MatTableDataSource<any>;

  displayedColumns: string[] = [
    'id',  
    'name',
    'email',
    'designation',
    'role',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    readonly userService: UserService,
    readonly _snackBar: MatSnackBar,
    readonly commonService: CommonService,
  ) {}

  ngOnInit() {
    this.fetchEmployee();
  }

  ngAfterViewInit(): void {
    try {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.log(error);
    }
  }

  fetchEmployee() {
    this.userService.getAllEmployees().subscribe(response => {
            
      if (response.length !== 0) {
        this.userService.userId$.next(
          response.reduce(
            (max: number, obj: { id: number }) => (obj.id > max ? obj.id : max),
            0
          ) + 1
        );
      }
      this.dataSource.data= response;
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

  /**
   * drag and drop the item
   * @param event
   */

  drop(event: CdkDragDrop<string[]>) {
    const dataArray = this.dataSource.data;
    moveItemInArray(dataArray, event.previousIndex, event.currentIndex);
    this.dataSource.data = dataArray;
  }

  /**
   * reload the user data and create user Id
   */

  handleChanges(operation: string, key?: string, title?: string) {
    let component;
    if (operation === 'add' || operation === 'edit') {
      component = UserFormComponent;
    } else {
      component = DeleteDialogComponent;
    }
    this.dialogueRes$ = this.commonService.openDialogue(
      component,
      '',
      key,
      title,
      'Are you sure want to delete '
    );
    this.afterDialogueClosed(key);
  }

  /**
   * after dialogue closed read the response and perform action.
   */
  afterDialogueClosed(key: string | undefined) {
    this.dialogueRes$.subscribe(response => {
      if (response === 'success') {
        this.fetchEmployee();
      } else if (response) {
        this.userService.deleteEmployee(key).subscribe(() => {
          this.fetchEmployee();
          this._snackBar.open('User Deleted Successfully', 'close', {
            duration: 2000,
          });
        });
      }
      else{
        return;
      }
    });
  }
}
