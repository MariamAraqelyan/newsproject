import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileModalComponent } from './edit-profile-modal.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { TextInputModule } from 'src/app/shared/components/text-input';
import { FileUploaderModule } from 'src/app/shared/components/file-uploader';


@NgModule({
  declarations: [EditProfileModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    SpinnerModule,
    TextInputModule,
    FileUploaderModule
  ],
  exports: [EditProfileModalComponent]
})
export class EditProfileModalModule { }
