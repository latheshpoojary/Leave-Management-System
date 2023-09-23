import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HolidayService } from 'src/app/shared/services/holidays/holiday.service';
import { DateValidator } from 'src/app/shared/validator/toDate.validator';

@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss'],
})
export class HolidayFormComponent implements OnInit {
  holidayForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    readonly fb: FormBuilder,
    readonly holidayService: HolidayService,
    readonly ref: MatDialogRef<HolidayFormComponent>,
    readonly _snackBar: MatSnackBar,
  ) {
    this.holidayForm = this.fb.group({
      event: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', [Validators.required, DateValidator.isDateBeforeToday]],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.key) {
      this.setPopUpValue(this.data.key);
    }
  }

  /**
   * set the value for each field of the holiday form
   * @param key
   */
  setPopUpValue(key: string) {
    this.holidayService.getHolidayById(key).subscribe((response:any) => {
      this.holidayForm.setValue({
        event: response['event'],
        description: response['description'],
        date: response['date'],
        type: response['type'],
      });
    });
  }

  /**
   * send the form value to the firebase database based on the presence of key.
   * display respectful snackbar message.
   */
  onSubmit() {
    if (this.data.key) {
      this.holidayService
        .updateHoliday(this.data.key, this.holidayForm.value)
        .subscribe(() => {
          this._snackBar.open('✅  Holiday Updated Successfully', '❌', {
            duration: 2000,
          });
          this.ref.close('success');
        });
    } else {
      this.holidayService.addHoliday(this.holidayForm.value).subscribe({
        next: () => {
          this._snackBar.open('✅  Holiday Added Successfully ', '❌', {
            duration: 2000,
          });
          this.ref.close('success');
        },
        error: () => {
          this._snackBar.open('Something Went Wrong🤔', '❌', {
            duration: 2000,
          });
        },
      });
    }
  }
}
