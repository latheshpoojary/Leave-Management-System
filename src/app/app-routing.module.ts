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
    data:{
      title:'Login Page',
      description:'Login Page with Email and Password Fields'
    }
  },
  {
    path:'dashboard',
    component:SidebarComponent,canActivate:[loginGuard],
    data:{
      title:"Home",
      description:'The Page shows the Sidebar with all the Routing Component'
    },
    children:[
      {
        path:'user',
        loadChildren:()=>import('../app/manage-user/manage-user.module').then(()=>ManageUserModule),
        canActivate:[loginGuard,adminGuard],  
        data:{
          title:'User',
          description:'User Info such as Adding,Deleting and Updating'
        }     
      },
      {
        path:'holidays',
        loadChildren:()=>import('../app/manage-holidays/manage-holidays.module').then(()=>ManageHolidaysModule),
        canActivate:[loginGuard,adminGuard],
        data:{
          title:'Holiday',
          description:'Holiday Info such as Adding,Deleting and Updating'
        }
      },
      {
        path:'request',
        loadChildren:()=>import('../app/manage-leave-request/manage-leave-request.module').then(()=>ManageLeaveRequestModule),
        canActivate:[loginGuard,adminGuard],
        data:{
          title:'Leave Request',
          description:'Request Info such as Adding,Deleting and Updating'
        }
      },
      {
        path:'leaves',
        loadChildren:()=>import('../app/manage-leave-list/manage-leave-list-routing.module').then(()=>ManageLeaveListModule),
        canActivate:[userGuard],
        data:{
          title:'Leaves',
          description:'Leave Request Info such as Adding,Deleting and Updating'
        }
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
