import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/services/user/user.service';

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
  userForm!:FormGroup;
  
  /** Constants used to fill up our data base. */
  public FRUITS: string[] = [
    'blueberry',
    'lychee',
    'kiwi',
    'mango',
    'peach',
    'lime',
    'pomegranate',
    'pineapple',
  ];
  public NAMES: string[] = [
    'Maia',
    'Asher',
    'Olivia',
    'Atticus',
    'Amelia',
    'Jack',
    'Charlotte',
    'Theodore',
    'Isla',
    'Oliver',
    'Isabella',
    'Jasper',
    'Cora',
    'Levi',
    'Violet',
    'Arthur',
    'Mia',
    'Thomas',
    'Elizabeth',
  ];
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb:FormBuilder,private userService:UserService) {
      // Create 100 users
    const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));

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
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  createNewUser(id: number): UserData {
    const name =
      this.NAMES[Math.round(Math.random() * (this.NAMES.length - 1))] +
      ' ' +
      this.NAMES[Math.round(Math.random() * (this.NAMES.length - 1))].charAt(0) +
      '.';
  
    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      fruit: this.FRUITS[Math.round(Math.random() * (this.FRUITS.length - 1))],
    }; 
  }

  onSubmit(){
    const email=this.userForm.value.email;
    const password = this.userForm.value.password;
    this.userService.loginAuth(email,password).subscribe(response=>{  
      console.log(response);
      
    },error=>{
      console.log(error);  
    })
    this.userService.loginRealtime(this.userForm.value).subscribe(response=>{
      console.log(response);  
    });
    this.userForm.reset();
    
  }
  close(){

  }
  
}

/** Builds and returns a new User. */
