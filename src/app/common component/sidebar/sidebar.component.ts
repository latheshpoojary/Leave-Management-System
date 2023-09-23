import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../../shared/services/login/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  public userName!:string | null;
  readonly breakpointObserver = inject(BreakpointObserver);
  readonly router= inject(Router);
  public loginService = inject(LoginService);
  readonly dialogue = inject(MatDialog);
  
  isAdmin = localStorage.getItem('admin');
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    ngOnInit(): void {
      this.userName = localStorage.getItem('userName');
    }

  logout(){
    const dialogueRes=this.dialogue.open(DeleteDialogComponent,{
      data: {
        titleText: 'Log Out',
        bodyText:'Are you Sure want to Log Out?',
        buttonText:'Log Out',
        buttonColor:'#0052cc'
      }
    });
   dialogueRes.afterClosed().subscribe(res=>{
    if(res){
      localStorage.clear();
      this.router.navigate(['login']);
    }
  });
    
    
  }
}
