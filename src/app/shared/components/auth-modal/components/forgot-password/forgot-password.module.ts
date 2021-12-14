import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TextInputModule } from 'src/app/shared/components/text-input';
import { SpinnerModule } from 'src/app/shared/components/spinner';


@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    TextInputModule,
    SpinnerModule
  ],
  exports: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
