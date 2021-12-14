import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmsVerificationRoutingModule } from './sms-verification-routing.module';
import { SmsVerificationComponent } from './sms-verification.component';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SmsCodeInputModule } from 'src/app/shared/components/sms-code-input';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { LogoLinkModule } from 'src/app/shared/components/logo-link';


@NgModule({
  declarations: [SmsVerificationComponent],
  imports: [
    CommonModule,
    SmsVerificationRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    SmsCodeInputModule,
    SpinnerModule,
    LogoLinkModule
  ]
})
export class SmsVerificationModule { }
