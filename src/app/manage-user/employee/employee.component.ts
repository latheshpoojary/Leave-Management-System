import { Component,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetails, UserService } from 'src/app/shared/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UserFormComponent } from '../user-form/user-form.component';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],

})

export class EmployeeComponent {
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

  constructor( private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userService.getAllEmployees().subscribe(response => {
      const employeeList = response;
      this.dataSource = new MatTableDataSource(employeeList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      console.log(this.dataSource);
    });
    this.isLoading = false;
  }

  fetchEmployee() {
    this.isLoading = true;
    this.userService.getAllEmployees().subscribe(response => {
      this.isLoading = false;
      const employeeList = response;
      this.dataSource = new MatTableDataSource(employeeList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
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

  // reset the form after submission
  onAdd(){
    this.openDialogue(UserFormComponent);
  }

  onEdit(key: any) {
    console.log("Edit Key",key);
    
   this.editKey = key;
   this.openDialogue(UserFormComponent,this.editKey);
  }

  onDelete(key: string) {
    this.deleteKey = key;
   this.openDialogue(DeleteDialogComponent,this.deleteKey);
  }

  openDialogue(component:any,key?:string){
    const popRef=this.dialog.open(component,{
     width:"min(80%,800px)",
     data:{
      key:key
     }
     
    })
    popRef.afterClosed().subscribe(response=>{ 
      if(response){
        this.userService.deleteEmployee(this.deleteKey).subscribe(response => {
          this.fetchEmployee();
        })
      }
      else{
        this.fetchEmployee();
      }
         
        
 
    })
  }

}

/** Builds and returns a new User. */
