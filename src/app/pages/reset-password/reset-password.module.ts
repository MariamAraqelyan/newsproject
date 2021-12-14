import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TextInputModule } from 'src/app/shared/components/text-input';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { LogoLinkModule } from 'src/app/shared/components/logo-link';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    TextInputModule,
    SpinnerModule,
    LogoLinkModule
  ]
})
export class ResetPasswordModule { }
