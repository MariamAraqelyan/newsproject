import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewRateComponent } from './review-rate.component';

import { MatButtonModule } from '@angular/material/button';
import { StarRatingModule } from 'src/app/shared/components/star-rating';
import { StarRatingSetterModule } from 'src/app/shared/components/star-rating-setter';


@NgModule({
  declarations: [ReviewRateComponent],
  imports: [
    CommonModule,
    StarRatingModule,
    StarRatingSetterModule,
    MatButtonModule
  ],
  exports: [ReviewRateComponent]
})
export class ReviewRateModule { }
