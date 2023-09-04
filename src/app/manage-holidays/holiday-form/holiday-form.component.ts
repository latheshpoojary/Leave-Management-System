import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HolidayService } from 'src/app/shared/services/holidays/holiday.service';

@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss']
})
export class HolidayFormComponent implements OnInit{
  isEditMode=false;
  holidayForm! :FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private holidayService:HolidayService,private ref:DialogRef<HolidayFormComponent>){
    this.holidayForm = this.fb.group({
      event:['',Validators.required],
      description:['',Validators.required],
      date:['',Validators.required],
      type:['',Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.data.key){
      this.isEditMode = true;
      this.setPopUpValue(this.data.key)
    }
  }
  setPopUpValue(key: string) {
    this.holidayService.getHolidayById(key).subscribe((response:any)=>{
      console.log(response);
      
      this.holidayForm.setValue({
        event:response['event'],
        description:response['description'],
        date:response['date'],
        type:response['type']
      })
    })
  }

  onSubmit(){
    if(this.data.key){
      this.holidayService.updateHoliday(this.data.key,this.holidayForm.value).subscribe(response=>{
        this.ref.close();
      })
    }
    else{
      this.holidayService.addHoliday(this.holidayForm.value).subscribe(response=>{
        console.log(response); 
        this.ref.close();
      },error=>{
        console.log(error); 
      })
    }
    
  }
}
