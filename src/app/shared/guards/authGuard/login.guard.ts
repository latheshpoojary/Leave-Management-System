import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);

  if(!localStorage.getItem('user') && !localStorage.getItem('admin')){
    router.navigate(['login']);
  }
  return true;
};
