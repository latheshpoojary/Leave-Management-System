import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../../shared/services/login/login.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  public userName!:string | null;
  titleName!:string;
  readonly breakpointObserver = inject(BreakpointObserver);
  readonly router= inject(Router);
  public loginService = inject(LoginService);
  readonly dialogue = inject(MatDialog);
  public title = inject(Title);
  private metaService=inject(Meta);
  readonly activatedRoute=inject(ActivatedRoute);
  
  isAdmin = localStorage.getItem('admin');
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    ngOnInit(): void {
      this.title.setTitle("Home")
      this.router.events.pipe(
        filter(event=>event instanceof NavigationEnd),

      ).subscribe(()=>{
        let result = this.getChild(this.activatedRoute);
        result.data.subscribe(data=>{
          this.titleName = data['title'];
          this.title.setTitle(data['title']);
          if(data['description']){
            this.metaService.addTag({name:'Description',content:data['description']})
          }
          else{
            this.metaService.removeTag("name='Description'")
          }
        })
      })
      this.userName = localStorage.getItem('userName');

    }
  getChild(activatedRoute: ActivatedRoute):ActivatedRoute {
    if(activatedRoute.firstChild){
      return this.getChild(activatedRoute.firstChild);
    }
    else{
      return activatedRoute;
    }
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
