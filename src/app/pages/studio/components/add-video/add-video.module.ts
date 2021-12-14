import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVideoComponent } from './add-video.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddVideoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [AddVideoComponent]
})
export class AddVideoModule { }
