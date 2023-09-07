import { Component ,OnInit} from '@angular/core';
import { HolidayService } from 'src/app/shared/services/holidays/holiday.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HolidayFormComponent } from '../holiday-form/holiday-form.component';
import { DeleteDialogComponent } from 'src/app/manage-user/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit{
  holidays:any[]=[];
  dataSource!: MatTableDataSource<any>;
  isLoading=false;
  deleteKey!: string;
  editKey!: string;
  constructor(private holidayService:HolidayService,private dialogue:MatDialog){}
  ngOnInit(): void {
    this.holidayService.getAllHolidays().subscribe(response=>{
      this.holidays = response;   
      this.dataSource = new MatTableDataSource(this.holidays);
      console.log(this.dataSource);
      
      console.log(this.holidays);
    })
  }

  loadHoliday(){
    console.log("Load Holidays");
    this.holidayService.getAllHolidays().subscribe(response=>{ 
      console.log(response,"response data");
      this.holidays=response;
      console.log(this.holidays,"Holiday Data"); 
      this.dataSource = new MatTableDataSource(this.holidays);   
      console.log(this.holidays);
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAdd(){
    this.openPopUp(HolidayFormComponent);
  }

  onEdit(key:string){
   this.editKey = key;
    this.openPopUp(HolidayFormComponent,this.editKey);
  }

  onDelete(key:string,title:string){
    this.deleteKey = key;
    this.openPopUp(DeleteDialogComponent,title);
  }
  
  openPopUp(component:any,key?:string,title?:string) {
    const addPopUpRef=this.dialogue.open(component,{
      data:{
        key:key,
        title:title
      }
    });
    addPopUpRef.afterClosed().subscribe(response=>{

      if(response){
        
        this.holidayService.deleteHoliday(this.deleteKey).subscribe(response=>{
          console.log(response,"Delete Response");
          this.loadHoliday();
        })
      }else{
        // this.loadHoliday();
      }
      
      
    })
  }


  
 
 



}
