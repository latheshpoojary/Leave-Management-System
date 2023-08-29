import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavesListComponent } from './leaves-list/leaves-list.component';

const routes: Routes = [
  {
    path:'',
    component:LeavesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageLeaveListRoutingModule { }
