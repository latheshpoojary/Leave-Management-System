import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  if(!localStorage.getItem("admin")){
    alert("Permission denied")
    router.navigate(['dashboard/leaves'])
    return false;
  }
  return true;
};
