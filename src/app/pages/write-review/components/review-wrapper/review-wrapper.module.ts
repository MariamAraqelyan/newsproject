import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewWrapperComponent } from './review-wrapper.component';

import { ReviewRateModule } from './../review-rate';
import { ReviewDescriptionModule } from './../review-description';
import { MobHeaderModule } from 'src/app/shared/components/mob-header';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/shared/components/spinner';


@NgModule({
  declarations: [ReviewWrapperComponent],
  imports: [
    CommonModule,
    ReviewRateModule,
    ReviewDescriptionModule,
    MobHeaderModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  exports: [ReviewWrapperComponent]
})
export class ReviewWrapperModule { }
