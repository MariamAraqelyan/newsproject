import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileUploaderModule } from 'src/app/shared/components/file-uploader';
import { TextInputModule } from 'src/app/shared/components/text-input';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import {Ng2TelInputModule} from 'ng2-tel-input';


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    FileUploaderModule,
    TextInputModule,
    SpinnerModule,
    Ng2TelInputModule
  ],
  exports: [SignUpComponent]
})
export class SignUpModule { }
