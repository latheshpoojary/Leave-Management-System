import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveService } from 'src/app/shared/services/leaves/leave.service';
import { DateValidator} from 'src/app/shared/validator/toDate.validator';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit{
  leaveForm!:FormGroup;
  isEditMode=false;
  constructor(private fb:FormBuilder,public leaveService :LeaveService,@Inject(MAT_DIALOG_DATA) public data: any,private ref:DialogRef<LeaveFormComponent>,private _snackBar: MatSnackBar){
    this.leaveForm = this.fb.group({
      from:['',[
        Validators.required,
        DateValidator.isDateBeforeToday]],
      to:['',[
        Validators.required,
        DateValidator.isDateBeforeToday,
        DateValidator.largerThanFrom,
      ]],
      type:['',Validators.required],
      reason:['',Validators.required],
    })
  }

  ngOnInit(): void {
    if(this.data.key){
     this.isEditMode = true;
     this.setFormValue();
    }
  }

  onSelect(){
    console.log(this.leaveForm.controls);
    
  }

  setFormValue(){
    this.leaveService.fetchLeaveByKey(this.data.key,this.data.userKey).subscribe((response:any)=>{
      this.leaveForm.setValue({
        from:response['from'],
        to:response['to'],
        type:response['type'],
        reason:response['reason'],
      })
    });
  }

  onSubmit(){
    console.log(this.leaveForm.controls);
    
    if(this.data.key){
      this.leaveService.editLeave(this.data.key,this.data.userKey,this.leaveForm.value).subscribe(response=>{
        if(response){
          this._snackBar.open("Leave Updated Successfully","close",{
            duration:2000
          })
          this.ref.close();
        }
      })
    }
    else{
      this.leaveService.addLeaves(this.leaveForm.value).subscribe(response=>{
        this._snackBar.open("Leave Request Sent Successfully","close",{
          duration:2000
        })
        if(response){   
          this.leaveService.remaining_casual_leaves.subscribe(res=>{
           
            console.log(res);
            
          })
          this.ref.close();
        }
      })
    }
    
    
  }

}
