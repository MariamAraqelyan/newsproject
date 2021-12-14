import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileUploaderModule } from 'src/app/shared/components/file-uploader';
import { TextInputModule } from 'src/app/shared/components/text-input';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { LogoLinkModule } from 'src/app/shared/components/logo-link';
import {Ng2TelInputModule} from 'ng2-tel-input';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    FileUploaderModule,
    TextInputModule,
    SpinnerModule,
    LogoLinkModule,
    Ng2TelInputModule
  ]
})
export class SignUpModule { }
