import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common component/login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loginGuard } from './shared/guards/login.guard';
import { ManageUserModule } from '../app/manage-user/manage-user.module';
import { ManageHolidaysModule } from './manage-holidays/manage-holidays.module';
import { ManageLeaveRequestModule } from './manage-leave-request/manage-leave-request.module';
import { ManageLeaveListModule } from './manage-leave-list/manage-leave-list.module';
import { formGuard } from './shared/guards/deactivate/form.guard';
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
    component:SidebarComponent,canActivate:[loginGuard],
    children:[
      {
        path:'user',
        loadChildren:()=>import('../app/manage-user/manage-user.module').then(m=>ManageUserModule),
        canActivate:[loginGuard],       
      },
      {
        path:'holidays',
        loadChildren:()=>import('../app/manage-holidays/manage-holidays.module').then(m=>ManageHolidaysModule),
        canActivate:[loginGuard]
      },
      {
        path:'request',
        loadChildren:()=>import('../app/manage-leave-request/manage-leave-request.module').then(m=>ManageLeaveRequestModule),
        canActivate:[loginGuard]
      },
      {
        path:'leaves',
        loadChildren:()=>import('../app/manage-leave-list/manage-leave-list-routing.module').then(m=>ManageLeaveListModule),
        canActivate:[loginGuard]
      }
    ]   
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
