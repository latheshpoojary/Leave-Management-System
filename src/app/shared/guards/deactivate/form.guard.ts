import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CanDeactivateFn } from '@angular/router';

export const formGuard: CanDeactivateFn<unknown> = (component:any, currentRoute, currentState, nextState) => {
  if(component.form.invalid && component){
    return true;
  }
  else{
    return false;
  }
};
