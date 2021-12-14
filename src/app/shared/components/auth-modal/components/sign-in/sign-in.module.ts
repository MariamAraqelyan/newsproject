
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TextInputModule } from 'src/app/shared/components/text-input';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import {Ng2TelInputModule} from 'ng2-tel-input';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    TextInputModule,
    SpinnerModule,
    Ng2TelInputModule
  ],
  exports: [SignInComponent]
})
export class SignInModule { }
