import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { loginGuard } from '../shared/guards/authGuard/login.guard';

const routes: Routes = [
  {
    path:'',
    component:LeaveRequestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageLeaveRequestRoutingModule { }
