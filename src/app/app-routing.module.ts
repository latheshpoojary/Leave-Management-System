import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common component/login/login.component';
import { SidebarComponent } from './common component/sidebar/sidebar.component';
import { loginGuard } from './shared/guards/authGuard/login.guard';
import { ManageUserModule } from '../app/manage-user/manage-user.module';
import { ManageHolidaysModule } from './manage-holidays/manage-holidays.module';
import { ManageLeaveRequestModule } from './manage-leave-request/manage-leave-request.module';
import { ManageLeaveListModule } from './manage-leave-list/manage-leave-list.module';
import { adminGuard } from './shared/guards/adminGuard/admin.guard';
import { NotfoundComponent } from './common component/notfound/notfound.component';
import { userGuard } from './shared/guards/userGuard/user.guard';
const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'dashboard',
    component:SidebarComponent,canActivate:[loginGuard],
    children:[
      {
        path:'user',
        loadChildren:()=>import('../app/manage-user/manage-user.module').then(()=>ManageUserModule),
        canActivate:[loginGuard,adminGuard],       
      },
      {
        path:'holidays',
        loadChildren:()=>import('../app/manage-holidays/manage-holidays.module').then(()=>ManageHolidaysModule),
        canActivate:[loginGuard,adminGuard],
      },
      {
        path:'request',
        loadChildren:()=>import('../app/manage-leave-request/manage-leave-request.module').then(()=>ManageLeaveRequestModule),
        canActivate:[loginGuard,adminGuard],
      },
      {
        path:'leaves',
        loadChildren:()=>import('../app/manage-leave-list/manage-leave-list-routing.module').then(()=>ManageLeaveListModule),
        canActivate:[userGuard],
      },
    ],   
  },
  {
    path:'**',
    component:NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
