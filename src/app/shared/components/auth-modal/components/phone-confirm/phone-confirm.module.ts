import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneConfirmComponent } from './phone-confirm.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SmsCodeInputModule } from 'src/app/shared/components/sms-code-input';
import { SpinnerModule } from 'src/app/shared/components/spinner';


@NgModule({
  declarations: [PhoneConfirmComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    SmsCodeInputModule,
    SpinnerModule
  ],
  exports: [PhoneConfirmComponent]
})
export class PhoneConfirmModule { }
