import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordConfirmRoutingModule } from './password-confirm-routing.module';
import { PasswordConfirmComponent } from './password-confirm.component';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TextInputModule } from 'src/app/shared/components/text-input';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { LogoLinkModule } from 'src/app/shared/components/logo-link';


@NgModule({
  declarations: [PasswordConfirmComponent],
  imports: [
    CommonModule,
    PasswordConfirmRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    TextInputModule,
    SpinnerModule,
    LogoLinkModule
  ]
})
export class PasswordConfirmModule { }
