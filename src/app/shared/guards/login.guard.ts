import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const service = inject(LoginService);
  const router = inject(Router);
  ;
  
  
  if(!localStorage.getItem("user")){
    router.navigate(['login']);
  }
  return true;
};
