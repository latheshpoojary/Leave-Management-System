import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = () => {
  const router=inject(Router);
  if(!localStorage.getItem('user')){
    alert('Permission denied');
    router.navigate(['dashboard']);
    return false;
  }
  return true;
};
