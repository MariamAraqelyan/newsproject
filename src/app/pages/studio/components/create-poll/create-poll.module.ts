import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePollComponent } from './create-poll.component';
import { CreatePollRoutingModule } from './create-poll-routing.module';


import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [CreatePollComponent],
  imports: [
    CommonModule,
    CreatePollRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    SpinnerModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class CreatePollModule { }
