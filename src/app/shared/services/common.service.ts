import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(readonly dialog: MatDialog) {    
   }

  
  openDialogue(component: any,leaveKey?:string, key?: string | null, title?: string,bodyText?:string,buttonText='Delete',buttonColor='red'){
    const popRef = this.dialog.open(component, {
      width: 'min(80%,800px)',
      data: {
        key,
        leaveKey,
        title,
        bodyText,
        buttonText,
        buttonColor
      }
    });
    return popRef.afterClosed();
  }
}
