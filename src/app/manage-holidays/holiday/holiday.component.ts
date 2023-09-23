import { Component, OnInit } from '@angular/core';
import { HolidayService } from 'src/app/shared/services/holidays/holiday.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HolidayFormComponent } from '../holiday-form/holiday-form.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TitleCasePipe } from '@angular/common';
import { CommonService } from 'src/app/shared/services/common.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss'],
})
export class HolidayComponent implements OnInit {
  holidays:any[]= [];
  dataSource = new MatTableDataSource<any>();
  isLoading = false;
  dialogueRef$!: Observable<any>;
  constructor(
    readonly holidayService: HolidayService,
    readonly dialogue: MatDialog,
    readonly _snackBar: MatSnackBar,
    readonly titleCase: TitleCasePipe,
    readonly commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.loadHoliday();
  }

  /**
   * filter the array based the filter string
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * used for drag and drop the element
   * @param event
   */

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.holidays, event.previousIndex, event.currentIndex);
  }

  /**
   * call the getHoliday method and store the details inside the holiday array
   */
  loadHoliday() {
    this.isLoading = true;
    this.holidayService.getAllHolidays().subscribe(response => {
      this.isLoading = false;
      console.log(response);
      
      this.holidays = response;
      if (response.length > 0) {
        this.dataSource.data = response;
      }
    });
  }

  /**
   * give the boolean value showing the holiday is upcoming or not
   * @param holidayDate
   * @returns
   */
  isUpcoming(holidayDate: string): boolean {
    const [year, month, day] = holidayDate.split('-');
    const formattedDate = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10)
    );
    return formattedDate > new Date();
  }

  /**
   * handle the edit ,add and delete operation and navigate these operation to the dialogue based on the operation type
   * @param operation
   * @param key
   * @param title
   */

  handleChanges(operation: string, key?: string, title?: string) {
    let component;
    if (operation === 'add' || operation === 'edit') {
      component = HolidayFormComponent;
    } else {
      component = DeleteDialogComponent;
    }
    this.dialogueRef$ = this.commonService.openDialogue(
      component,
      '',
      key,
      title,
      'Are you sure want to delete '
    );
    this.afterDialogueClosed(key);
  }

  /**
   * after closing dialogue performs operation based on the response.
   *
   */
  afterDialogueClosed(key: string | undefined) {
    this.dialogueRef$.subscribe(response => {
      if (response === 'success') {
        this.loadHoliday();
      } else if (response) {
        this.holidayService.deleteHoliday(key).subscribe(() => {
          this._snackBar.open('✅  Deleted Successfully', '❌', {
            duration: 2000,
          });
          this.loadHoliday();
        });
      }
      else{
        return ;
      }
    });
  }
}
