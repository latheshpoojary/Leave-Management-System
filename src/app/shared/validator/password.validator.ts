import { AbstractControl } from "@angular/forms";

export class passwordValidator{

    static passwordShouldMatch(control:AbstractControl){
        const newPassword = control.parent?.get('password');
        console.log(newPassword,"new Password");
        
        if(newPassword?.value !== control.value){
            return {passwordShouldMatch:true};
        }
        return null;
    }

}