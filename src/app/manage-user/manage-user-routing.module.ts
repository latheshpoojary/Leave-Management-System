import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { employeeResolver } from '../shared/resolver/employee.resolver';
import { formGuard } from '../shared/guards/deactivate/form.guard';
import { UserFormComponent } from './user-form/user-form.component';
const routes: Routes = [
  {
    path:'',
    component:UserComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
