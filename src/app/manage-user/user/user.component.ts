import { AfterViewInit, Component,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { UserDetails, UserService } from 'src/app/shared/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { CanDeactivateFn } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataSource } from '@angular/cdk/collections';

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

export class UserComponent implements AfterViewInit{
  showForm = false;
  employeeList!: UserDetails[];
  isLoading = false;
  isEditMode = false;
  editKey!: string;
  deleteKey !:string;
  /** Constants used to fill up our data base. */

  displayedColumns: string[] = ['id', 'name', 'email', 'designation', "role", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataInitialized!: boolean;

  constructor( private userService: UserService, private dialog: MatDialog,private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    // let maxUserId;
    this.userService.getAllEmployees().subscribe(response => {
      const employeeList = response;
      if(response.length!=0){
        this.userService.userId$.next(response.reduce((max: number, obj: { userId: number; }) => (obj.userId > max ? obj.userId : max), -Infinity)+1);
      //  console.log("Maximum User ID:", maxUserId);
       ;      
      }
      console.log(employeeList);
      this.dataSource = new MatTableDataSource(employeeList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      console.log(this.dataSource);
      
    });
    // this.isLoading = false;
  }

  ngAfterViewInit(): void {
    try {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      
    }
    
  }

  fetchEmployee() {
    // this.isLoading = true;
    this.userService.getAllEmployees().subscribe(response => {
      // this.isLoading = false;
      this.userService.userId$.next(response.reduce((max: number, obj: { id: number; }) => (obj.id > max ? obj.id : max), -Infinity)+1);
      const employeeList = response;
      this.dataSource = new MatTableDataSource(employeeList);
      this.dataSource.paginator =this.paginator ;
      this.dataSource.sort = this.sort;
      
      console.log(this.dataSource);
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
    moveItemInArray(dataArray , event.previousIndex, event.currentIndex);
    this.dataSource.data = dataArray;

  }
  
  // reset the form after submission
  onAdd(){
    this.openDialogue(UserFormComponent);
  }

  onEdit(key: any) {
    console.log("Edit Key",key);
    
   this.editKey = key;
   this.openDialogue(UserFormComponent,this.editKey);
  }

  onDelete(key: string,title:string) {
    this.deleteKey = key;
   this.openDialogue(DeleteDialogComponent,this.deleteKey,title);
  }

  openDialogue(component:any,key?:string,title?:string){
    const popRef=this.dialog.open(component,{
     width:"min(80%,800px)",
     data:{
      key:key,
      title:title
     }
     
    })
    popRef.afterClosed().subscribe(response=>{ 
      console.log(response,"response from the pop up");
      
      if(response){
        this.userService.deleteEmployee(this.deleteKey).subscribe(response => {
          this.fetchEmployee();
          this._snackBar.open("User Deleted Successfully","close",{
            duration:2000
          })
        })
      }
      else{
        this.fetchEmployee();
      }
         
        
 
    })
  }

}

/** Builds and returns a new User. */
