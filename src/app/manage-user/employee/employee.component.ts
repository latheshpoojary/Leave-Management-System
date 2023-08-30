import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { UserDetails, UserService } from 'src/app/shared/services/user/user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';

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

export class EmployeeComponent implements OnInit{
  userForm!:FormGroup;
  showForm=false;
  employeeList! :UserDetails[];
  isLoading = false;
  /** Constants used to fill up our data base. */

  displayedColumns: string[] = ['id', 'name', 'email', 'designation',"role","action"];
  dataSource!: MatTableDataSource<UserDetails>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb:FormBuilder,private userService:UserService) {
    //user form initialization
    this.userForm = this.fb.group({
      id:[''],
      name:[''],
      designation:[''],
      role:[''],
      email:[''],
      password:['']

    })

    // Assign the data to the data source for the table to render
    
  }




  ngOnInit(): void {
    console.log("init");   
    this.fetchEmployee();  
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  fetchEmployee(){
    this.isLoading= true;
    this.userService.getEmployees().pipe(
      map(
        (employee: any) => {
          const dataArray = Object.keys(employee).map(key => ({
            id: key,
            ...employee[key]
          }));
          return dataArray;
      })
    ).subscribe(response=>{
      
      console.log(this.isLoading);
      this.isLoading = false;
      console.log(this.isLoading);
      this.employeeList = response;
      this.dataSource = new MatTableDataSource(this.employeeList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
     
      console.log(this.employeeList);
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

  //send User data
  onSubmit(){
    const email=this.userForm.value.email;
    const password = this.userForm.value.password;
    // authentication database details
    this.userService.addEmployee(email,password).subscribe(response=>{  
      console.log(response);     
    },error=>{
      console.log(error);  
    })
    // realtime database details
    this.userService.addEmployeeRealTime(this.userForm.value).subscribe(response=>{
      console.log(response); 
      this.fetchEmployee(); 
    });
    // reset the form after submission
    this.userForm.reset();
    this.showForm = false;
    
    
  }

  cancel(){
    this.userForm.reset();
  } 
}

/** Builds and returns a new User. */
