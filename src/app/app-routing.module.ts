import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common component/login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loginGuard } from './shared/guards/login.guard';
import { ManageUserModule } from '../app/manage-user/manage-user.module';
import { ManageHolidaysModule } from './manage-holidays/manage-holidays.module';
import { ManageLeaveRequestModule } from './manage-leave-request/manage-leave-request.module';
import { ManageLeaveListModule } from './manage-leave-list/manage-leave-list.module';
import { DashboardComponent } from './common component/dashboard/dashboard.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,canActivate:[loginGuard]
  },
  {
    path:'user',
    loadChildren:()=>import('../app/manage-user/manage-user.module').then(m=>ManageUserModule)
  },
  {
    path:'holidays',
    loadChildren:()=>import('../app/manage-holidays/manage-holidays.module').then(m=>ManageHolidaysModule)
  },
  {
    path:'request',
    loadChildren:()=>import('../app/manage-leave-request/manage-leave-request.module').then(m=>ManageLeaveRequestModule)
  },
  {
    path:'leaves',
    loadChildren:()=>import('../app/manage-leave-list/manage-leave-list-routing.module').then(m=>ManageLeaveListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
