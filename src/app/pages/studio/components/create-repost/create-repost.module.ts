import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRepostComponent } from './create-repost.component';
import { CreateRepostRoutingModule } from './create-repost-routing.module';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CreateRepostComponent],
  imports: [
    CommonModule,
    CreateRepostRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    SpinnerModule,
    RouterModule
  ],
  exports: [CreateRepostComponent]
})
export class CreateRepostModule { }
