import { AbstractControl } from "@angular/forms";

export class passwordValidator{

    static passwordShouldMatch(control:AbstractControl){
        const newPassword = control.parent?.get('password');
        if(newPassword?.value !== control.value){
            return {passwordShouldMatch:true};
        }
        return null;
    }

}