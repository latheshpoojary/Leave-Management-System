import { AbstractControl, ValidationErrors } from "@angular/forms";

export class DateValidator {
  static largerThanFrom(control: AbstractControl): ValidationErrors | null{
   
      const fromDateControl = control.parent?.get('from');
      const toDateControl = control;

      if (!fromDateControl || !toDateControl) {
        
        return null; // Return null if controls are not found
      }

      const fromDateValue = fromDateControl.value;
      const toDateValue = toDateControl.value;

      // Check if both dates are valid and not empty
      if (!fromDateValue || !toDateValue) {
        return null; // Return null if either date is empty
      }

      const fromDate = new Date(fromDateValue);
      const toDate = new Date(toDateValue);

      if (fromDate > toDate) {
        return { greaterThan: true }; // Validation failed
      } else {
        return null; // Validation passed
      }
   
  }

  static isDateBeforeToday(control: AbstractControl):ValidationErrors | null{
    const dateControlValue = control.value;
    const currentDate = new Date().getTime()-1000*60*60*24;
    const selectedDate = new Date(dateControlValue).getTime();
    console.log("Current date",currentDate,"Selected date",selectedDate);
    
    console.log(currentDate,"  :" , selectedDate);
    
    if(selectedDate>=currentDate){
      return null;
    }
    return {beforeToday:true};
    
  }
}
