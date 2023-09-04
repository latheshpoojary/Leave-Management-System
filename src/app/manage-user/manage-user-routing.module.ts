import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { employeeResolver } from '../shared/resolver/employee.resolver';
const routes: Routes = [
  {
    path:'',
    component:EmployeeComponent,resolve:{employee:employeeResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
