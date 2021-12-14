import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsCodeInputComponent } from './sms-code-input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SmsCodeInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [SmsCodeInputComponent]
})
export class SmsCodeInputModule { }
