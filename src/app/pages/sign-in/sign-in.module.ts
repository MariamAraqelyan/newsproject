import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TextInputModule } from 'src/app/shared/components/text-input';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { LogoLinkModule } from 'src/app/shared/components/logo-link';
import {Ng2TelInputModule} from 'ng2-tel-input';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    TextInputModule,
    SpinnerModule,
    LogoLinkModule,
    Ng2TelInputModule
  ]
})
export class SignInModule { }
