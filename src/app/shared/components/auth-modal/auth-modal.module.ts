import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal.component';

import { MatButtonModule } from '@angular/material/button';
import { SignInModule } from './components/sign-in';
import { SignUpModule } from './components/sign-up';
import { PhoneConfirmModule } from './components/phone-confirm';
import { ForgotPasswordModule } from './components/forgot-password';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [AuthModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    SignInModule,
    SignUpModule,
    PhoneConfirmModule,
    ForgotPasswordModule,
    MatDialogModule,
  ]
})
export class AuthModalModule { }
