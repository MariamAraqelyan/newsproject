import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddImageComponent } from './add-image.component';

import { FileUploaderModule } from 'src/app/shared/components/file-uploader';


@NgModule({
  declarations: [AddImageComponent],
  imports: [
    CommonModule,
    FileUploaderModule
  ],
  exports: [AddImageComponent]
})
export class AddImageModule { }
