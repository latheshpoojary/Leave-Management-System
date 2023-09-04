import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveService } from 'src/app/shared/services/leaves/leave.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit{
  leaveForm!:FormGroup;
  isEditMode=false;
  constructor(private fb:FormBuilder,private leaveService :LeaveService,@Inject(MAT_DIALOG_DATA) public data: any,private ref:DialogRef<LeaveFormComponent>){
    this.leaveForm = this.fb.group({
      from:[''],
      to:[''],
      type:[''],
      reason:[''],
    })
  }

  ngOnInit(): void {
    if(this.data.key){
     this.isEditMode = true;
     this.setFormValue();
    }
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
    if(this.data.key){
      this.leaveService.editLeave(this.data.key,this.data.userKey,this.leaveForm.value).subscribe(response=>{
        if(response){
          this.ref.close();
        }
      })
    }
    else{
      this.leaveService.addLeaves(this.leaveForm.value).subscribe(response=>{
        if(response){
          this.ref.close();
        }
      })
    }
    
    
  }

}
